
import React, { useState, useEffect } from 'react';
import { Plane, Search, MapPin, Clock, ChevronRight, DollarSign, Sun, CloudRain, ArrowRightLeft, Cloud, CloudLightning, Wind, RefreshCw } from 'lucide-react';
import { GlassCard } from './ui/GlassCard';
import { TOP_LOUNGES, MOCK_FLIGHTS } from '../constants';

// Mock Weather Database to simulate API responses based on IATA/City
const WEATHER_DB: Record<string, { temp: number, condition: string, city: string, icon: any }> = {
    // Brasil
    'GRU': { temp: 24, condition: 'Parcialmente Nublado', city: 'São Paulo (GRU)', icon: Cloud },
    'CGH': { temp: 25, condition: 'Ensolarado', city: 'São Paulo (CGH)', icon: Sun },
    'GIG': { temp: 32, condition: 'Sol Forte', city: 'Rio de Janeiro (GIG)', icon: Sun },
    'BSB': { temp: 27, condition: 'Seco/Ensolarado', city: 'Brasília (BSB)', icon: Sun },
    'SSA': { temp: 29, condition: 'Vento Forte', city: 'Salvador (SSA)', icon: Wind },
    'REC': { temp: 30, condition: 'Chuva Esparsa', city: 'Recife (REC)', icon: CloudRain },
    'POA': { temp: 18, condition: 'Nublado', city: 'Porto Alegre (POA)', icon: Cloud },
    // EUA
    'MIA': { temp: 28, condition: 'Ensolarado', city: 'Miami (MIA)', icon: Sun },
    'MCO': { temp: 29, condition: 'Parcialmente Nublado', city: 'Orlando (MCO)', icon: Cloud },
    'JFK': { temp: 12, condition: 'Chuvoso', city: 'Nova York (JFK)', icon: CloudRain },
    'LAX': { temp: 22, condition: 'Céu Limpo', city: 'Los Angeles (LAX)', icon: Sun },
    'LAS': { temp: 35, condition: 'Deserto/Seco', city: 'Las Vegas (LAS)', icon: Sun },
    // Europa
    'LIS': { temp: 19, condition: 'Vento Moderado', city: 'Lisboa (LIS)', icon: Wind },
    'OPO': { temp: 17, condition: 'Chuvoso', city: 'Porto (OPO)', icon: CloudRain },
    'LHR': { temp: 14, condition: 'Chuva Fina', city: 'Londres (LHR)', icon: CloudRain },
    'CDG': { temp: 16, condition: 'Nublado', city: 'Paris (CDG)', icon: Cloud },
    'MAD': { temp: 26, condition: 'Ensolarado', city: 'Madrid (MAD)', icon: Sun },
    'FCO': { temp: 24, condition: 'Céu Limpo', city: 'Roma (FCO)', icon: Sun },
};

export const TravelHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'flight' | 'lounges' | 'tools'>('flight');
  const [flightSearch, setFlightSearch] = useState('');
  const [loungeSearch, setLoungeSearch] = useState('');
  const [flightResult, setFlightResult] = useState<any>(null);
  
  // Currency Converter State
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState<'USD' | 'EUR'>('USD');
  const [rates, setRates] = useState<{ usd: number, eur: number } | null>(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [lastUpdate, setLastUpdate] = useState<string>('');

  // Weather State
  const [weatherSearch, setWeatherSearch] = useState('');
  const [weatherResult, setWeatherResult] = useState<any>(null);
  const [weatherRegion, setWeatherRegion] = useState<'BR' | 'US' | 'EU'>('BR');

  // --- FETCH CURRENCY RATES (REAL API) ---
  useEffect(() => {
      const fetchRates = async () => {
          setLoadingRates(true);
          try {
              // Using awesomeapi.com.br (Free, Public, Reliable for BRL pairs)
              const response = await fetch('https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL');
              const data = await response.json();
              
              setRates({
                  usd: parseFloat(data.USDBRL.bid),
                  eur: parseFloat(data.EURBRL.bid)
              });
              
              const now = new Date();
              setLastUpdate(`${now.toLocaleDateString()} às ${now.toLocaleTimeString()}`);
          } catch (error) {
              console.error("Erro ao buscar cotação", error);
              // Fallback values if API fails
              setRates({ usd: 5.20, eur: 5.60 }); 
          } finally {
              setLoadingRates(false);
          }
      };

      if (activeTab === 'tools') {
          fetchRates();
      }
  }, [activeTab]);

  const handleFlightSearch = () => {
    const found = MOCK_FLIGHTS.find(f => f.flightNumber.toLowerCase() === flightSearch.toLowerCase());
    setFlightResult(found || 'not-found');
  };

  const handleWeatherSearch = (query: string) => {
      const key = query.toUpperCase();
      // Direct match or partial match
      const foundKey = Object.keys(WEATHER_DB).find(k => k === key || WEATHER_DB[k].city.toUpperCase().includes(key));
      
      if (foundKey) {
          setWeatherResult(WEATHER_DB[foundKey]);
      } else {
          // Mock generic result for unlisted cities to keep UX good
          setWeatherResult({ 
              temp: Math.floor(Math.random() * (30 - 10) + 10), 
              condition: 'Parcialmente Nublado', 
              city: query.toUpperCase(), 
              icon: Cloud 
          });
      }
  };

  // Filter lounges based on search
  const filteredLounges = loungeSearch.length < 2 
    ? [] 
    : [...TOP_LOUNGES.brasil, ...TOP_LOUNGES.mundo].filter(item => 
        item.airport.toLowerCase().includes(loungeSearch.toLowerCase())
      );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex gap-4 border-b border-white/5 pb-2 overflow-x-auto">
        <button 
          onClick={() => setActiveTab('flight')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'flight' ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' : 'text-zinc-400 hover:text-white'}`}
        >
          <Plane size={16} /> Rastreador de Voo
        </button>
        <button 
          onClick={() => setActiveTab('lounges')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'lounges' ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' : 'text-zinc-400 hover:text-white'}`}
        >
          <MapPin size={16} /> Localizar Salas
        </button>
        <button 
          onClick={() => setActiveTab('tools')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 whitespace-nowrap ${activeTab === 'tools' ? 'bg-gold-500 text-black shadow-lg shadow-gold-500/20' : 'text-zinc-400 hover:text-white'}`}
        >
          <DollarSign size={16} /> Ferramentas
        </button>
      </div>

      {activeTab === 'tools' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           
           {/* Currency Converter */}
           <GlassCard className="space-y-4">
              <div className="flex justify-between items-start">
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <ArrowRightLeft className="text-gold-500" size={20} /> Conversor Comercial
                  </h3>
                  <div className="text-right">
                      <span className="text-[10px] text-emerald-500 font-bold uppercase flex items-center gap-1 justify-end">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Live API
                      </span>
                      <p className="text-[10px] text-zinc-500">Atualizado: {lastUpdate}</p>
                  </div>
              </div>

              <div className="bg-zinc-950 rounded-xl p-6 border border-white/10 space-y-6">
                 <div className="flex items-center gap-4">
                    <div className="flex-1">
                        <label className="text-xs text-zinc-500 uppercase font-bold mb-1 block">Valor em Moeda Estrangeira</label>
                        <input 
                        type="number" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full bg-transparent text-3xl font-bold text-white outline-none border-b border-white/20 pb-2 focus:border-gold-500"
                        />
                    </div>
                    <select 
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as any)}
                      className="bg-zinc-800 text-white p-3 rounded-lg font-bold outline-none border border-white/10"
                    >
                       <option value="USD">USD ($)</option>
                       <option value="EUR">EUR (€)</option>
                    </select>
                 </div>
                 
                 <div className="relative h-px bg-white/10 w-full">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-950 p-2 rounded-full border border-white/10 text-zinc-500">
                        {loadingRates ? <RefreshCw className="animate-spin" size={16} /> : <ArrowRightLeft size={16} className="rotate-90" />}
                    </div>
                 </div>

                 <div className="text-center">
                    <p className="text-zinc-400 text-xs uppercase mb-1 font-bold tracking-wider">Cotação Comercial Hoje</p>
                    <p className="text-4xl font-bold text-emerald-400">
                       R$ {rates ? (parseFloat(amount || '0') * (currency === 'USD' ? rates.usd : rates.eur)).toFixed(2) : '...'}
                    </p>
                    <p className="text-xs text-zinc-600 mt-2">
                        1 {currency} = R$ {rates ? (currency === 'USD' ? rates.usd.toFixed(4) : rates.eur.toFixed(4)) : '...'}
                    </p>
                 </div>
              </div>
              <p className="text-[10px] text-zinc-500 text-center">
                  *Valores baseados no Dólar/Euro Comercial. Não inclui IOF ou Spread bancário.
              </p>
           </GlassCard>

           {/* Destination Weather */}
           <GlassCard className="space-y-4 h-full flex flex-col">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                 <Sun className="text-gold-500" size={20} /> Clima no Destino
              </h3>
              
              <div className="flex gap-2 mb-2">
                  <input 
                     type="text"
                     placeholder="Digite o código (Ex: MIA, JFK, LIS)..."
                     className="flex-1 bg-black border border-white/10 rounded-lg p-2 text-white text-sm uppercase outline-none focus:border-gold-500"
                     value={weatherSearch}
                     onChange={e => setWeatherSearch(e.target.value)}
                  />
                  <button 
                    onClick={() => handleWeatherSearch(weatherSearch)}
                    className="bg-zinc-800 px-4 rounded-lg text-white hover:bg-zinc-700"
                  >
                      <Search size={16} />
                  </button>
              </div>

              {/* Quick Suggestions */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  <button onClick={() => setWeatherRegion('BR')} className={`px-3 py-1 rounded-full text-xs font-bold border ${weatherRegion==='BR' ? 'bg-white/10 border-white text-white' : 'border-zinc-700 text-zinc-500'}`}>Brasil</button>
                  <button onClick={() => setWeatherRegion('US')} className={`px-3 py-1 rounded-full text-xs font-bold border ${weatherRegion==='US' ? 'bg-white/10 border-white text-white' : 'border-zinc-700 text-zinc-500'}`}>EUA</button>
                  <button onClick={() => setWeatherRegion('EU')} className={`px-3 py-1 rounded-full text-xs font-bold border ${weatherRegion==='EU' ? 'bg-white/10 border-white text-white' : 'border-zinc-700 text-zinc-500'}`}>Europa</button>
              </div>

              <div className="space-y-2 flex-1 overflow-y-auto pr-2 max-h-[300px]">
                 {(weatherResult ? [weatherResult] : Object.values(WEATHER_DB).filter(w => {
                     if(weatherRegion === 'BR') return ['GRU','GIG','BSB','SSA','REC','POA','CGH'].some(c => w.city.includes(c));
                     if(weatherRegion === 'US') return ['MIA','MCO','JFK','LAX','LAS'].some(c => w.city.includes(c));
                     return ['LIS','OPO','LHR','CDG','MAD','FCO'].some(c => w.city.includes(c));
                 })).map((item, i) => (
                     <div key={i} className="flex items-center justify-between bg-white/5 p-3 rounded-xl hover:bg-white/10 transition-colors cursor-pointer" onClick={() => { setWeatherResult(item); setWeatherSearch(''); }}>
                        <div className="flex items-center gap-3">
                           <item.icon className={item.temp > 25 ? "text-yellow-400" : item.temp < 15 ? "text-blue-400" : "text-white"} size={24} />
                           <div>
                              <p className="text-white font-bold text-sm">{item.city}</p>
                              <p className="text-zinc-500 text-[10px] uppercase">{item.condition}</p>
                           </div>
                        </div>
                        <span className="text-xl font-bold text-white">{item.temp}°C</span>
                     </div>
                 ))}
                 {weatherResult && (
                     <button onClick={() => setWeatherResult(null)} className="w-full py-2 text-xs text-zinc-500 hover:text-white">Ver lista completa</button>
                 )}
              </div>
           </GlassCard>
        </div>
      )}

      {activeTab === 'flight' && (
        <GlassCard className="space-y-6">
          <div>
            <h3 className="text-lg font-bold text-white">Onde está seu voo?</h3>
            <p className="text-zinc-400 text-sm">Digite o número do voo (ex: TP58, AA930) para ver status, terminal e portão.</p>
          </div>
          
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Nº do Voo (ex: TP58)" 
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none uppercase"
              value={flightSearch}
              onChange={(e) => setFlightSearch(e.target.value)}
            />
            <button 
              onClick={handleFlightSearch}
              className="px-6 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl font-medium transition-colors"
            >
              Buscar
            </button>
          </div>

          {flightResult === 'not-found' && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              Voo não encontrado na base de dados simulada. Tente "TP58" ou "AA930".
            </div>
          )}

          {flightResult && flightResult !== 'not-found' && (
            <div className="bg-zinc-950/50 border border-white/5 rounded-xl p-6 space-y-4">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs text-zinc-500 font-bold uppercase tracking-wider">{flightResult.airline}</span>
                  <h2 className="text-3xl font-bold text-white">{flightResult.flightNumber}</h2>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  flightResult.status === 'No Horário' ? 'bg-emerald-500/20 text-emerald-400' : 
                  flightResult.status === 'Atrasado' ? 'bg-red-500/20 text-red-400' : 'bg-gold-500/20 text-gold-500'
                }`}>
                  {flightResult.status}
                </div>
              </div>

              <div className="flex items-center gap-8 relative">
                 {/* Flight Line */}
                 <div className="absolute top-1/2 left-10 right-10 h-[2px] bg-zinc-800 -z-10"></div>
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-zinc-900 p-1 rounded-full border border-white/10 text-gold-500">
                   <Plane size={16} className="rotate-90" />
                 </div>

                 <div className="bg-zinc-900 p-4 rounded-xl border border-white/10 text-center min-w-[100px]">
                   <p className="text-2xl font-bold text-white">{flightResult.origin.split('(')[1].replace(')','')}</p>
                   <p className="text-xs text-zinc-500 truncate max-w-[100px]">{flightResult.origin.split('(')[0]}</p>
                 </div>
                 <div className="ml-auto bg-zinc-900 p-4 rounded-xl border border-white/10 text-center min-w-[100px]">
                   <p className="text-2xl font-bold text-white">{flightResult.destination.split('(')[1].replace(')','')}</p>
                   <p className="text-xs text-zinc-500 truncate max-w-[100px]">{flightResult.destination.split('(')[0]}</p>
                 </div>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/5">
                <div className="text-center">
                  <p className="text-xs text-zinc-500 uppercase">Embarque</p>
                  <p className="text-white font-mono font-bold">{flightResult.departureTime}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-500 uppercase">Terminal</p>
                  <p className="text-white font-mono font-bold">{flightResult.terminal || '-'}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-zinc-500 uppercase">Portão</p>
                  <p className="text-white font-mono font-bold">{flightResult.gate || 'A definir'}</p>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      )}

      {activeTab === 'lounges' && (
        <GlassCard className="space-y-6">
           <div>
            <h3 className="text-lg font-bold text-white">Guia de Salas VIP</h3>
            <p className="text-zinc-400 text-sm">Digite o nome da cidade ou sigla do aeroporto (Ex: GRU, Miami).</p>
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="Aeroporto ou Cidade..." 
              className="flex-1 bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-gold-500/50 outline-none"
              value={loungeSearch}
              onChange={(e) => setLoungeSearch(e.target.value)}
            />
            <div className="bg-zinc-800 px-4 flex items-center justify-center rounded-xl text-zinc-400">
               <Search size={20} />
            </div>
          </div>

          <div className="space-y-4">
            {filteredLounges.length > 0 ? (
                filteredLounges.map((item, idx) => (
                   <div key={idx} className="bg-black/40 border border-white/5 rounded-xl p-4 hover:border-gold-500/30 transition-colors group animate-fade-in">
                     <div className="flex justify-between items-center mb-3">
                       <h4 className="text-gold-500 font-bold text-lg">{item.airport}</h4>
                       <MapPin size={14} className="text-zinc-600 group-hover:text-gold-500 transition-colors" />
                     </div>
                     <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                       {item.lounges.map((lounge, i) => (
                         <li key={i} className="text-sm text-zinc-300 flex items-center gap-2 p-2 bg-white/5 rounded-lg">
                           <span className="w-1.5 h-1.5 bg-gold-500 rounded-full"></span>
                           {lounge}
                         </li>
                       ))}
                     </ul>
                   </div>
                ))
            ) : (
               <div className="text-center py-8 bg-zinc-900/30 rounded-xl border border-dashed border-white/10">
                  {loungeSearch ? (
                     <>
                        <p className="text-zinc-400">Nenhuma sala encontrada para "{loungeSearch}" na nossa lista rápida.</p>
                        <p className="text-gold-500 text-sm mt-2 font-bold cursor-pointer">Falar com Concierge para verificar cobertura global.</p>
                     </>
                  ) : (
                     <p className="text-zinc-500 text-sm">Comece digitando para buscar...</p>
                  )}
               </div>
            )}
          </div>
        </GlassCard>
      )}
    </div>
  );
};
