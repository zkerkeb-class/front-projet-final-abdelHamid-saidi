import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';
import Button19 from '../components/Button19';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState<{ email?: string; motDePasse?: string }>({});
  const [loading, setLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const { login, joueur } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (joueur) {
      navigate('/');
    }
  }, [joueur, navigate]);

  const validate = () => {
    const errors: { email?: string; motDePasse?: string } = {};
    if (!email) errors.email = 'Email requis';
    if (!motDePasse) errors.motDePasse = 'Mot de passe requis';
    return errors;
  };

  const handleSubmit = async () => {
    try {
      setError('');
      const errors = validate();
      setFieldError(errors);
      if (Object.keys(errors).length > 0) return;
      setLoading(true);
      try {
        await login({ email, motDePasse });
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || 'Erreur de connexion');
        setShake(true);
        setTimeout(() => setShake(false), 500);
      } finally {
        setLoading(false);
      }
    } catch (err: any) {
      setError('Erreur inattendue, veuillez réessayer.');
      setLoading(false);
    }
  };

  // Gestion label flottant
  const isEmailActive = email.length > 0;
  const isPasswordActive = motDePasse.length > 0;

  return (
    <div className="min-h-screen flex items-center justify-center p-0 relative overflow-hidden" style={{ background: 'none' }}>
      {/* Fond nuage flouté */}
      <div className="absolute inset-0 -z-10">
        <img src="/nuage.png" alt="Fond nuage" className="w-full h-full object-cover filter blur-[1px] brightness-75" />
      </div>
      <div className={` rounded-2xl shadow-2xl flex flex-col md:flex-row w-full max-w-3xl overflow-hidden border border-[#e0e0e0] animate-fade-in transition-all duration-300 ${shake ? 'animate-shake' : ''} hover:shadow-[0_8px_32px_0_rgba(44,62,80,0.25)] md:-translate-y-4 backdrop-blur-[8px]`}> 
        {/* Partie gauche : image avec blur, brightness, overlay dégradé */}
        <div className="hidden md:flex relative w-1/2 min-h-[400px]">
          <img src="/login.png" alt="Login visuel" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2C3E50]/50 to-[#1899D6]/20" />
          <div className="absolute inset-0 flex flex-col items-center justify-end text-center p-4">
            <span className="text-white text-sm text-base font-medium drop-shadow mb-1 opacity-80">Votre jeu préféré vous attend sur cette plateforme.</span>
            <span className="text-white text-sm text-base font-medium drop-shadow mb-2 opacity-80">Jouez avec amour, gagnez en jouant.</span>
          </div>
        </div>
        {/* Partie droite : formulaire */}
        <div className="flex-1 flex flex-col justify-center p-8 bg-[#F4F4F4]">
          <div className="flex items-center justify-center flex-col mb-10">
            <img src="/logo.png" alt="Logo BizTown" className="w-22 h-22 object-cover" />
            <span className="text-[#2C3E50] text-2xl font-bold">Se Connectez</span>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-[#2C3E50] text-sm mb-1">Email</label>
              <TextInput
                type="email"
                className={` ${fieldError.email ? 'border-[#C84B31]' : ''}`}
                placeholder="Entrez votre email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
              />
              {fieldError.email && <div className="text-[#C84B31] text-xs mt-1">{fieldError.email}</div>}
            </div>
            <div>
              <label className="block text-[#2C3E50] text-sm mb-1">Mot de passe</label>
              <TextInput
                type={showPassword ? 'text' : 'password'}
                className={`  ${fieldError.motDePasse ? 'border-[#C84B31]' : ''}`}
                placeholder="Entrez votre mot de passe"
                value={motDePasse}
                onChange={e => setMotDePasse(e.target.value)}
                required
              />
              {fieldError.motDePasse && <div className="text-[#C84B31] text-xs mt-1">{fieldError.motDePasse}</div>}
            </div>
            {/* Checkbox animée Se souvenir de moi */}
            <div className="flex items-center justify-between text-xs text-[#2C3E50] mt-2">
              <div className="checkbox-wrapper-12 flex items-center">
                <div className="cbx">
                  <input id="cbx-12" type="checkbox" />
                  <label htmlFor="cbx-12"></label>
                  <svg width="15" height="14" viewBox="0 0 15 14" fill="none">
                    <path d="M2 8.36364L6.23077 12L13 2"></path>
                  </svg>
                </div>
                <span className="ml-2 select-none">Se souvenir de moi</span>
                {/* Gooey */}
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
                  <defs>
                    <filter id="goo-12">
                      <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur"></feGaussianBlur>
                      <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -7" result="goo-12"></feColorMatrix>
                      <feBlend in="SourceGraphic" in2="goo-12"></feBlend>
                    </filter>
                  </defs>
                </svg>
              </div>
              <a
                href="#"
                className="text-blue font-semibold transition hover:underline hover:text-[#4A90E2] [#1899D6]/40 "
              >
                Mot de passe oublié ?
              </a>
            </div>
            <Button19
              disabled={loading || !email || !motDePasse}
              onClick={handleSubmit}
              className="mt-2"
            >
              {loading ? (
                <span className="flex items-center justify-center"><svg className="animate-spin mr-2" width="20" height="20" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="#fff" strokeWidth="4"></circle><path className="opacity-75" fill="#4A90E2" d="M4 12a8 8 0 018-8v8z"></path></svg>Connexion...</span>
              ) : 'Commencer à jouer'}
            </Button19>
            {error && <div className="text-[#C84B31] text-sm text-center mt-2">{error}</div>}
          </div>
          <div className="text-center text-[#2C3E50] text-sm mt-4">
            Pas encore de compte ?{' '} 
            <a
                href="/register"
                className="text-blue font-semibold transition hover:underline hover:text-[#4A90E2] [#1899D6]/40 "
              >
               Inscrivez-vous
              </a>
          </div>
        </div>
      </div>
      {/* Animation shake et effet ripple */}
      <style>{`
        .text-blue {
          color: #1899D6 !important;
        }
        .animate-shake {
          animation: shake 0.4s cubic-bezier(.36,.07,.19,.97) both;
        }
        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .ripple-effect {
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background: rgba(74, 144, 226, 0.3);
          pointer-events: none;
          z-index: 10;
        }
        @keyframes ripple {
          to {
            transform: scale(2.5);
            opacity: 0;
          }
        }
        .checkbox-wrapper-12 {
          position: relative;
        }
        .checkbox-wrapper-12 > svg {
          position: absolute;
          top: -130%;
          left: -170%;
          width: 110px;
          pointer-events: none;
        }
        .checkbox-wrapper-12 * {
          box-sizing: border-box;
        }
        .checkbox-wrapper-12 input[type="checkbox"] {
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          -webkit-tap-highlight-color: transparent;
          cursor: pointer;
          margin: 0;
        }
        .checkbox-wrapper-12 input[type="checkbox"]:focus {
          outline: 0;
        }
        .checkbox-wrapper-12 .cbx {
          width: 24px;
          height: 24px;
          position: relative;
          zoom: 0.7;
        }
        .checkbox-wrapper-12 .cbx input {
          position: absolute;
          top: 0;
          left: 0;
          width: 24px;
          height: 24px;
          border: 2px solid #bfbfc0;
          border-radius: 50%;
        }
        .checkbox-wrapper-12 .cbx label {
          width: 24px;
          height: 24px;
          background: none;
          border-radius: 50%;
          position: absolute;
          top: 0;
          left: 0;
          -webkit-filter: url("#goo-12");
          filter: url("#goo-12");
          transform: translate3d(0, 0, 0);
          pointer-events: none;
        }
        .checkbox-wrapper-12 .cbx svg {
          position: absolute;
          top: 5px;
          left: 4px;
          z-index: 1;
          pointer-events: none;
        }
        .checkbox-wrapper-12 .cbx svg path {
          stroke: #fff;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 19;
          stroke-dashoffset: 19;
          transition: stroke-dashoffset 0.3s ease;
          transition-delay: 0.2s;
        }
        .checkbox-wrapper-12 .cbx input:checked + label {
          animation: splash-12 0.6s ease forwards;
        }
        .checkbox-wrapper-12 .cbx input:checked + label + svg path {
          stroke-dashoffset: 0;
        }
        @keyframes splash-12 {
          40% {
            background: #1899D6;
            box-shadow: 0 -18px 0 -8px #1899D6, 16px -8px 0 -8px #1899D6, 16px 8px 0 -8px #1899D6, 0 18px 0 -8px #1899D6, -16px 8px 0 -8px #1899D6, -16px -8px 0 -8px #1899D6;
          }
          100% {
            background: #1899D6;
            box-shadow: 0 -36px 0 -10px transparent, 32px -16px 0 -10px transparent, 32px 16px 0 -10px transparent, 0 36px 0 -10px transparent, -32px 16px 0 -10px transparent, -32px -16px 0 -10px transparent;
          }
        }
      `}</style>
    </div>
  );
};

export default Login; 