import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import TextInput from '../components/TextInput';

const Register: React.FC = () => {
  const [pseudo, setPseudo] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [error, setError] = useState('');
  const [fieldError, setFieldError] = useState<{ pseudo?: string; email?: string; motDePasse?: string }>({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, joueur } = useAuth();

  useEffect(() => {
    if (joueur) {
      navigate('/dashboard');
    }
  }, [joueur, navigate]);

  const validate = () => {
    const errors: { pseudo?: string; email?: string; motDePasse?: string } = {};
    if (!pseudo) errors.pseudo = 'Pseudo requis';
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
        await register({ pseudo, email, motDePasse });
        navigate('/dashboard');
      } catch (err: any) {
        setError(err.message || "Erreur lors de l'inscription");
      } finally {
        setLoading(false);
      }
    } catch (err: any) {
      setError('Erreur inattendue, veuillez réessayer.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden gradient-bg">
      {/* Fond animé avec particules */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent-300/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary-300/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-accent-200/10 rounded-full blur-3xl animate-pulse-slow"></div>
      </div>

      {/* Carte d'inscription moderne */}
      <div className="w-full max-w-4xl bg-white/90 backdrop-blur-xl rounded-3xl shadow-large border border-white/20 overflow-hidden animate-fade-in">
        <div className="flex flex-col lg:flex-row min-h-[600px]">
          {/* Section gauche - Image et branding */}
          <div className="lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-accent-500 via-accent-600 to-primary-500">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="relative h-full flex flex-col justify-center items-center text-white p-8">
              <div className="text-center space-y-6 animate-slide-up">
                <div className="relative">
                  <img src="/logo.png" alt="Logo BizTown" className="w-24 h-24 rounded-2xl object-cover shadow-2xl mx-auto mb-6 animate-bounce-gentle" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-accent-400 to-primary-400 rounded-2xl blur-lg opacity-30 animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-4xl font-bold mb-2 text-gradient">BizTown</h1>
                  <p className="text-lg font-medium opacity-90">Rejoignez l'aventure</p>
                </div>
                <div className="space-y-3 text-sm opacity-80">
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>Créez votre compte gratuitement</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                    <span>Accédez à toutes les fonctionnalités</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                    <span>Commencez à construire votre ville</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section droite - Formulaire */}
          <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
            <div className="space-y-8">
              {/* En-tête du formulaire */}
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold text-secondary-900">Créer un compte</h2>
                <p className="text-secondary-600">Rejoignez BizTown et commencez votre aventure</p>
              </div>

              {/* Formulaire */}
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-6">
                {/* Pseudo */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary-700">
                    Nom d'utilisateur
                  </label>
                  <div className="relative">
                    <TextInput
                      type="text"
                      className="pr-10"
                      placeholder="Votre nom d'utilisateur"
                      value={pseudo}
                      onChange={e => setPseudo(e.target.value)}
                      required
                      error={fieldError.pseudo}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary-700">
                    Adresse email
                  </label>
                  <div className="relative">
                    <TextInput
                      type="email"
                      className="pr-10"
                      placeholder="votre@email.com"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      required
                      error={fieldError.email}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                      <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Mot de passe */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-secondary-700">
                    Mot de passe
                  </label>
                  <TextInput
                    type="password"
                    placeholder="Créez un mot de passe sécurisé"
                    value={motDePasse}
                    onChange={e => setMotDePasse(e.target.value)}
                    required
                    error={fieldError.motDePasse}
                  />
                </div>

                {/* Conditions d'utilisation */}
                <div className="flex items-start space-x-3">
                  <input 
                    type="checkbox" 
                    id="terms" 
                    className="w-4 h-4 text-accent-600 border-secondary-300 rounded focus:ring-accent-500 mt-1" 
                    required
                  />
                  <label htmlFor="terms" className="text-sm text-secondary-600">
                    J'accepte les{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700 font-medium transition-colors">
                      conditions d'utilisation
                    </a>
                    {' '}et la{' '}
                    <a href="#" className="text-accent-600 hover:text-accent-700 font-medium transition-colors">
                      politique de confidentialité
                    </a>
                  </label>
                </div>

                {/* Bouton d'inscription */}
                <button
                  type="submit"
                  disabled={loading || !pseudo || !email || !motDePasse}
                  className="w-full btn-accent py-4 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Création du compte...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>Créer mon compte</span>
                    </div>
                  )}
                </button>

                {/* Message d'erreur */}
                {error && (
                  <div className="flex items-center space-x-2 p-3 bg-error-50 border border-error-200 rounded-xl text-error-700 text-sm">
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    <span>{error}</span>
                  </div>
                )}
              </form>

              {/* Lien de connexion */}
              <div className="text-center">
                <p className="text-secondary-600">
                  Déjà un compte ?{' '}
                  <a href="/login" className="text-accent-600 hover:text-accent-700 font-semibold transition-colors">
                    Se connecter
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register; 