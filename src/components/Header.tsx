import React from 'react';
import churchInfo from '../data/churchInfo.json';
import { ChurchInfo } from '../types';
import { Music, MapPin, Award, Quote } from 'lucide-react';

interface HeaderProps {
  info?: ChurchInfo;
}

export const Header: React.FC<HeaderProps> = ({ info = churchInfo }) => {
  const [logoError, setLogoError] = React.useState(false);

  return (
    <header className="relative bg-church-cream/75 border border-church-beige/90 rounded-3xl shadow-neu-raised overflow-hidden mb-6">
      {/* Top institutional tri-color accent bar with Navy & Matte Gold */}
      <div className="h-2.5 w-full bg-gradient-to-r from-church-navy via-church-gold to-church-navy" />

      <div className="px-5 py-6 sm:px-8 sm:py-7">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Church Emblem & Identity */}
          <div className="flex items-center gap-4 text-center md:text-left">
            {/* Neumorphic Logo Container */}
            <div className="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-church-navy to-church-navy-dark text-church-white-warm flex items-center justify-center shadow-neu-navy border border-church-gold/40 overflow-hidden">
              {!logoError ? (
                <img
                  src="./images/logo1.jpeg"
                  alt="Logo AIEC"
                  className="w-full h-full object-cover rounded-2xl"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="text-center">
                  <Music className="w-8 h-8 sm:w-9 sm:h-9 mx-auto text-church-gold-light" />
                  <span className="text-[9px] font-black tracking-widest uppercase block mt-0.5 text-church-gold">A.I.E.C</span>
                </div>
              )}
              {/* Gold Accent Tag */}
              <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-church-gold rounded-full flex items-center justify-center text-church-white-warm border-2 border-church-cream shadow-neu-raised-sm">
                <span className="text-[10px] font-black">†</span>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-church-gold-dark mb-1">
                <Award className="w-3.5 h-3.5 text-church-gold" />
                <span>{info.subtitle}</span>
              </div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-church-navy tracking-tight leading-tight">
                {info.name}
              </h1>
              <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs text-church-navy/80 font-medium mt-1">
                <MapPin className="w-3.5 h-3.5 text-church-gold flex-shrink-0" />
                <span>{info.address}</span>
              </div>
            </div>
          </div>

          {/* Right: Ministry Tag & Legal / Motto */}
          <div className="flex flex-col items-center md:items-end text-center md:text-right gap-2.5 border-t md:border-t-0 pt-4 md:pt-0 border-church-beige/70 w-full md:w-auto">
            {/* Neumorphic Ministry Banner */}
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-church-navy text-church-white-warm font-black tracking-widest text-xs sm:text-sm uppercase shadow-neu-navy border border-church-gold/40 hover:scale-[1.02] transition-transform">
              <Music className="w-4 h-4 text-church-gold" />
              <span>MINISTERIO DE {info.ministryName}</span>
            </div>

            {/* Legal text */}
            <p className="text-[11px] font-medium text-church-navy/70 max-w-sm">
              {info.legalText}
            </p>

            {/* Motto with Inset Neumorphic Capsule */}
            <div className="flex items-center gap-1.5 text-[11px] font-semibold text-church-navy bg-church-ivory px-3.5 py-1.5 rounded-full border border-church-beige/80 shadow-neu-pressed-sm">
              <Quote className="w-2.5 h-2.5 rotate-180 text-church-gold" />
              <span className="italic">{info.motto}</span>
              <Quote className="w-2.5 h-2.5 text-church-gold" />
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};
