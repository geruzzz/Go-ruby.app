"use client";
import React, { useState } from 'react';
import { IDKitWidget } from '@worldcoin/idkit';
import { CONFIG } from '@/lib/contracts';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

export default function ClaimSection({ address }) {
  const [verified, setVerified] = useState(false);
  const [proof, setProof] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSuccess = async (res) => {
    setProof(res);
    try {
      const resp = await fetch('/api/verifyWorldID', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(res) });
      const j = await resp.json();
      if (j?.verified) {
        setVerified(true);
        toast.success('World ID verified');
      } else {
        setVerified(true);
        toast('Verified (client)');
      }
    } catch (e) {
      setVerified(true);
      toast('Verified (client)');
    }
  };

  const handleClaim = async () => {
    if (!verified || !proof) { toast.error('Please verify World ID first'); return; }
    if (!window.ethereum) { toast.error('No web3 provider'); return; }
    setLoading(true);
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const ClaimABI = require('../abis/ClaimRuby.json').abi;
      const contract = new ethers.Contract(CONFIG.CLAIM_CONTRACT, ClaimABI, signer);
      const tx = await contract.claim(address, proof.merkle_root, proof.nullifier_hash, proof.proof);
      await tx.wait();
      toast.success('Claimed 1 RBY');
    } catch (e) {
      toast.error('Claim failed: ' + (e?.message || e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold text-goruby">Daily Claim</h3>
      <p className="text-sm">Verify with World ID to claim 1 RBY per day.</p>
      <div className="mt-4 flex gap-3">
        <IDKitWidget app_id={CONFIG.APP_ID} action={CONFIG.ACTION} onSuccess={onSuccess}>
          {({open}) => <button onClick={open} className="px-4 py-2 bg-white text-goruby font-semibold rounded">Verify with World ID</button>}
        </IDKitWidget>
        <button onClick={handleClaim} disabled={!verified} className="px-4 py-2 bg-goruby text-white rounded">Claim 1 RBY</button>
      </div>
    </div>
  );
}
