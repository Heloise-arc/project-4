import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

interface Referral {
  user: string;
  date: string;
  status: 'active' | 'pending';
  earnings: string;
}

export const ReferralTable: React.FC = () => {
  const referrals: Referral[] = [
    { user: 'trader123', date: '2024-03-01', status: 'active', earnings: '$245' },
    { user: 'crypto_whale', date: '2024-02-28', status: 'active', earnings: '$180' },
    { user: 'newbie_trader', date: '2024-02-25', status: 'pending', earnings: '$0' },
    { user: 'moon_boy', date: '2024-02-20', status: 'active', earnings: '$325' },
  ];

  return (
    <motion.div
      className="bg-background border border-primary/20 rounded-lg p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-xl font-bold mb-6">Recent Referrals</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm border-b border-primary/10">
              <th className="text-left py-3">User</th>
              <th className="text-left py-3">Date</th>
              <th className="text-left py-3">Status</th>
              <th className="text-right py-3">Earnings</th>
            </tr>
          </thead>
          <tbody>
            {referrals.map((referral, index) => (
              <motion.tr
                key={index}
                className="border-b border-primary/10 text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <td className="py-4">{referral.user}</td>
                <td className="py-4">{referral.date}</td>
                <td className="py-4">
                  <div className="flex items-center gap-2">
                    {referral.status === 'active' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span>Active</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-4 h-4 text-yellow-500" />
                        <span>Pending</span>
                      </>
                    )}
                  </div>
                </td>
                <td className="py-4 text-right">{referral.earnings}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};