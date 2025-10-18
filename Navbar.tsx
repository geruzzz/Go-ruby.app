"use client";
import React from 'react';

export default function Navbar({ tab, setTab }) {
  const tabs = ['Claim','Stake','Swap','Donate'];
  return (
    <nav className="flex items-center gap-4 p-4 bg-white shadow-sm">
      <div className="text-goruby font-bold">Go Ruby</div>
      <div className="ml-6 flex gap-2">
        {tabs.map(t => (
          <button key={t} onClick={()=>setTab(t)} className={"px-3 py-1 rounded-md " + (tab===t? 'bg-goruby text-white':'text-gray-700')}>
            {t}
          </button>
        ))}
      </div>
      <div className="ml-auto text-sm">
        <a href="https://gorubytoken.onhercules.app/" target="_blank" rel="noreferrer" className="text-black">gorubytoken.onhercules.app</a>
      </div>
    </nav>
  );
}
