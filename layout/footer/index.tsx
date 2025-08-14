import React from 'react'
import Link from 'next/link'
import { Mail, ExternalLink } from 'lucide-react'
import { HomeButton } from '@/components/HomeButton'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/50 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <HomeButton />
            <p className="text-sm text-muted-foreground max-w-md mt-3">
              Unified access to scholarly resources from library catalogs, institutional repositories, 
              subscription databases, and open-access archives in one intelligent search interface.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/search" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Advanced Search
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Browse Collections
                </Link>
              </li>
              <li>
                <Link 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground">
              © {currentYear} Discovery UI. All rights reserved.
            </div>

            {/* Version */}
            <div className="text-xs text-muted-foreground">
              v1.0.0
            </div>
          </div>
        </div>

        {/* Academic Resources Notice */}
        <div className="mt-6 pt-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center">
            This platform provides access to scholarly resources for educational and research purposes. 
            Please respect copyright and licensing terms of individual resources.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
