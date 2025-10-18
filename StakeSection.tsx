"use client";
import React, { useEffect, useState } from 'react';
import { CONTRACTS } from '@/lib/contracts';
import toast from 'react-hot-toast';
import { ethers } from 'ethers';

export default function StakeSection({ address }) {
  const [amount, setAmount] = useState('');
  const [status, setStatus] = useState('');
  const [staked, setStaked] = useState('0');

  useEffect(()=>{(async ()=>{try{ if(!address || !window.ethereum) return; const StakingABI = require('../abis/StakingRuby.json').abi; const provider = new ethers.BrowserProvider(window.ethereum); const c = new ethers.Contract(CONTRACTS.stakingRuby, StakingABI, provider); const info = await c.stakes(address); setStaked(ethers.formatUnits(info.amount||0,18));}catch(e){}})()},[address]);

  const handleStake = async ()=>{
    try{
      if(!window.ethereum) { toast.error('No web3 provider'); return; }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const tokenAbi = ['function approve(address,uint256) public returns (bool)'];
      const token = new ethers.Contract(CONTRACTS.rubyToken, tokenAbi, signer);
      const amt = ethers.parseUnits(amount||'0',18);
      await token.approve(CONTRACTS.stakingRuby, amt);
      const StakingABI = require('../abis/StakingRuby.json').abi;
      const staking = new ethers.Contract(CONTRACTS.stakingRuby, StakingABI, signer);
      await staking.stake(amt);
      toast.success('Staked ' + amount + ' RBY');
      setAmount('');
    }catch(e){ toast.error('Stake failed: ' + (e?.message || e)); }
  };

  const handleUnstake = async ()=>{
    try{
      if(!window.ethereum) { toast.error('No web3 provider'); return; }
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const StakingABI = require('../abis/StakingRuby.json').abi;
      const staking = new ethers.Contract(CONTRACTS.stakingRuby, StakingABI, signer);
      await staking.unstake();
      toast.success('Unstaked');
    }catch(e){ toast.error('Unstake failed: ' + (e?.message || e)); }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold text-goruby">Staking (15% APR)</h3>
      <p className="text-sm">Stake RBY and earn rewards.</p>
      <div className="mt-4 flex gap-2">
        <input value={amount} onChange={(e)=>setAmount(e.target.value)} placeholder="Amount (RBY)" className="p-2 border rounded flex-1" />
        <button onClick={handleStake} className="px-3 py-2 bg-goruby text-white rounded">Stake</button>
        <button onClick={handleUnstake} className="px-3 py-2 border rounded">Unstake</button>
      </div>
      <div className="mt-3">Currently staked: {staked} RBY</div>
    </div>
  );
}
