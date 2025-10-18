"use client";
import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ClaimSection from '../components/ClaimSection';
import StakeSection from '../components/StakeSection';
import SwapSection from '../components/SwapSection';
import DonateSection from '../components/DonateSection';
import { Toaster } from 'react-hot-toast';
import { useAccount } from 'wagmi';

export default function Page(){
  const [tab, setTab] = useState('Claim');
  const { address } = useAccount();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar tab={tab} setTab={setTab} />
      <main className="max-w-4xl mx-auto p-6">
        {tab==='Claim' && <ClaimSection address={address} />}
        {tab==='Stake' && <StakeSection address={address} />}
        {tab==='Swap' && <SwapSection />}
        {tab==='Donate' && <DonateSection />}
      </main>
      <footer className="text-center p-6 text-sm text-gray-500">Go Ruby — <a href="https://gorubytoken.onhercules.app/">gorubytoken.onhercules.app</a></footer>
      <Toaster position="bottom-right" />
    </div>
  );
}
