"use client";
import { Menu, X } from "lucide-react";
import React, { useState } from "react";
import { PolicyModalType } from "./PolicyModel";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

interface Props {
  setPolicyModelType: (type: PolicyModalType | null) => void;
}

const policyButtons: { type: PolicyModalType; label: string }[] = [
  {
    type: "privacy",
    label: "Політика конфіденційності",
  },
  {
    type: "terms",
    label: "Умови використання",
  },
  {
    type: "payment",
    label: "Умови оплати",
  },
  {
    type: "refund",
    label: "Політика повернення коштів",
  },
] as const;

const HeaderMenu: React.FC<Props> = ({ setPolicyModelType }) => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-30 px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex flex-col leading-none">
            <span
              className="text-xl md:text-2xl font-bold text-white drop-shadow-lg"
              style={{ fontFamily: "Georgia, serif", letterSpacing: "0.02em" }}
            >
              kberezhna
            </span>
            <span
              className="text-xl md:text-2xl font-light text-white/95 drop-shadow-lg"
              style={{
                fontFamily: "Courier New, monospace",
                letterSpacing: "0.15em",
              }}
            >
              school
            </span>
          </div>
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
      <AnimatePresence>
        {showMenu && (
          <motion.div
            key="menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white"
            transition={{ duration: 0.4 }}
          >
            <div className="h-full overflow-y-auto">
              <div className="max-w-4xl mx-auto px-6 py-8">
                <div className="flex items-center justify-between mb-12">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Потрібна допомога?
                  </h2>
                  <div className="flex items-center space-x-4">
                    <Link
                      href={"/client/auth/login"}
                      className="px-6 py-3 border-2 border-gray-900 rounded-full hover:text-custom-sage hover:border-custom-sage transition-all duration-300 font-medium text-gray-900"
                    >
                      Вхід
                    </Link>
                    <button
                      onClick={() => setShowMenu(false)}
                      className="p-3 rounded-full border-2 border-gray-900 hover:text-custom-sage hover:border-custom-sage text-black transition-all duration-300"
                    >
                      <X className="w-6 h-6 text-inherit" />
                    </button>
                  </div>
                </div>

                <div className="space-y-6 mb-16">
                  {policyButtons.map((item) => (
                    <button
                      key={item.type}
                      onClick={() => {
                        setPolicyModelType(item.type);
                        setShowMenu(false);
                      }}
                      className="block text-left text-2xl  font-bold text-gray-900 hover:text-custom-sage transition-colors duration-300"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>

                <div className="mt-8 flex justify-end">
                  <span className="text-lg font-bold text-gray-900">UA</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default HeaderMenu;
