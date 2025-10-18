"use client";
import React from 'react';
import toast from 'react-hot-toast';
import { CONFIG } from '@/lib/contracts';
import { ethers } from 'ethers';

export default function DonateSection(){ 
  const handleDonate = async ()=>{
    const amount = prompt('Enter native amount (e.g. 0.01):');
    if(!amount) return;
    try{
      if(!window.ethereum) throw new Error('No web3 provider');
      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send('eth_requestAccounts', []);
      const signer = await provider.getSigner();
      const tx = await signer.sendTransaction({ to: CONFIG.TOKEN, value: ethers.parseEther(amount) });
      await tx.wait();
      toast.success('Donation sent. Thank you!');
    }catch(e){ toast.error('Donation failed: ' + (e?.message || e)); }
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-bold text-goruby">Donate</h3>
      <p className="text-sm">Donations go to: <code>{CONFIG.TOKEN}</code></p>
      <div className="mt-3"><button onClick={handleDonate} className="px-4 py-2 bg-goruby text-white rounded">Donate</button></div>
    </div>
  );
}
