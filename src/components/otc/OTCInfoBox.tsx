import React from 'react';
import { Accordion } from './Accordion';

export const OTCInfoBox = () => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-mono font-semibold text-[#4E9F3D] mb-6">OTC Sale Details</h3>
      
      <Accordion title="Sale Information" defaultOpen={true}>
        <div className="space-y-4 font-mono">
          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">Start Date:</h4>
            <p className="text-[#4E9F3D]">11th February 2025</p>
          </div>
          
          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">Sale Mode:</h4>
            <p className="text-[#4E9F3D]">Fixed Price FCFS</p>
          </div>
          
          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">Price Per Token:</h4>
            <p className="text-[#4E9F3D]">0.1 USDC</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Token Information">
        <div className="space-y-4 font-mono">
          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">Total $SPR Supply:</h4>
            <p className="text-[#4E9F3D]">800,000,000 tokens</p>
          </div>
          
          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">Tokens on Sale:</h4>
            <p className="text-[#4E9F3D]">7,500,000 tokens</p>
            <p className="text-[#4E9F3D]/60 text-sm">(9.38% of the total supply)</p>
          </div>
          
          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">High Float:</h4>
            <p className="text-[#4E9F3D]">~94% of the supply circulating from day one</p>
          </div>

          <div>
            <h4 className="text-[#4E9F3D]/80 font-medium mb-1">Tokenomics:</h4>
            <a 
              href="https://x.com/supurr_app/status/1881379454397931824" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#4E9F3D] hover:underline"
            >
              View Tokenomics Details
            </a>
          </div>
        </div>
      </Accordion>

      <Accordion title="Token Deployment">
        <div className="space-y-4 font-mono">
          <div>
            <h5 className="text-[#4E9F3D]/80 font-medium mb-1">Deployment Timeline:</h5>
            <p className="text-[#4E9F3D]">Tokens will be deployed 1 week post sale.</p>
          </div>
        </div>
      </Accordion>

      <Accordion title="Fund Allocation">
        <div className="space-y-4 font-mono">
          <div>
            <h5 className="text-[#4E9F3D]/80 font-medium mb-1">Primary Allocation:</h5>
            <p className="text-[#4E9F3D]">The funds raised from the community OTC round will be utilized for HL spot auctions.</p>
          </div>
          
          <div>
            <h5 className="text-[#4E9F3D]/80 font-medium mb-1">Secondary Allocation:</h5>
            <p className="text-[#4E9F3D]">Any remaining funds will be earmarked for enhancing Hyperliquidity and supporting POL.</p>
          </div>
        </div>
      </Accordion>
    </div>
  );
}; 