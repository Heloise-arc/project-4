import React from 'react';
import { Accordion } from './Accordion';

export const OTCInfoBox = () => {
  return (
    <div className="mt-8 space-y-4">
      <h3 className="text-xl font-mono text-primary mb-6">OTC Sale Details</h3>
      
      <Accordion 
        title={<span className="text-primary font-mono">Sale Information</span>} 
        defaultOpen={true}
        className="bg-primary/10 rounded-lg"
        iconClassName="text-primary"
      >
        <div className="space-y-4 font-mono bg-background rounded-lg p-4">
          <div>
            <h4 className="text-primary font-medium mb-1">Start Date:</h4>
            <p className="text-primary">11th February 2025</p>
          </div>
          
          <div>
            <h4 className="text-primary font-medium mb-1">Sale Mode:</h4>
            <p className="text-primary">Fixed Price FCFS</p>
          </div>
          
          <div>
            <h4 className="text-primary font-medium mb-1">Price Per Token:</h4>
            <p className="text-primary">0.1 USDC</p>
          </div>
        </div>
      </Accordion>

      <Accordion 
        title={<span className="text-primary font-mono">Token Information</span>}
        className="bg-primary/10 rounded-lg"
        iconClassName="text-primary"
      >
        <div className="space-y-4 font-mono bg-background rounded-lg p-4">
          <div>
            <h4 className="text-primary font-medium mb-1">Total $SPR Supply:</h4>
            <p className="text-primary">800,000,000 tokens</p>
          </div>
          
          <div>
            <h4 className="text-primary font-medium mb-1">Tokens on Sale:</h4>
            <p className="text-primary">7,500,000 tokens</p>
            <p className="text-primary text-sm">(9.38% of the total supply)</p>
          </div>
          
          <div>
            <h4 className="text-primary font-medium mb-1">High Float:</h4>
            <p className="text-primary">~94% of the supply circulating from day one</p>
          </div>

          <div>
            <h4 className="text-primary font-medium mb-1">Tokenomics:</h4>
            <a 
              href="https://x.com/supurr_app/status/1881379454397931824" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline"
            >
              View Tokenomics Details
            </a>
          </div>
        </div>
      </Accordion>

      <Accordion 
        title={<span className="text-primary font-mono">Token Deployment</span>}
        className="bg-primary/10 rounded-lg"
        iconClassName="text-primary"
      >
        <div className="space-y-4 font-mono bg-background rounded-lg p-4">
          <div>
            <h4 className="text-primary font-medium mb-1">Deployment Timeline:</h4>
            <p className="text-primary">Tokens will be deployed 1 week post sale.</p>
          </div>
        </div>
      </Accordion>

      <Accordion 
        title={<span className="text-primary font-mono">Fund Allocation</span>}
        className="bg-primary/10 rounded-lg"
        iconClassName="text-primary"
      >
        <div className="space-y-4 font-mono bg-background rounded-lg p-4">
          <div>
            <h4 className="text-primary font-medium mb-1">Primary Allocation:</h4>
            <p className="text-primary">The funds raised from the community OTC round will be utilized for HL spot auctions.</p>
          </div>
          
          <div>
            <h4 className="text-primary font-medium mb-1">Secondary Allocation:</h4>
            <p className="text-primary">Any remaining funds will be earmarked for enhancing Hyperliquidity and supporting POL.</p>
          </div>
        </div>
      </Accordion>
    </div>
  );
}; 