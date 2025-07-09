import { useState } from 'react';
import Game from './Game.jsx';
import Podcast from './Podcast.jsx';

function App() {
  const [currentExample, setCurrentExample] = useState('menu');

  const examples = [
    { id: 'game', name: '井字棋游戏', component: <Game /> },
    { id: 'podcast', name: '播客', component: <Podcast /> },
  ];

  const renderContent = () => {
    if (currentExample === 'menu') {
      return (
        <div className="text-center p-12 rounded-xl bg-white/5 backdrop-blur-md shadow-2xl border border-cyan-400/30 max-w-xl mx-auto mt-32 animate-fade-in">
          <h1 className="text-4xl font-extrabold mb-10 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-glow animate-glow">React 练习例子</h1>
          <div className="space-y-6">
            {examples.map(example => (
              <button
                key={example.id}
                onClick={() => setCurrentExample(example.id)}
                className="w-60 py-3 px-6 rounded-xl font-bold text-lg tracking-wider text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 shadow-neon border-none outline-none transition-all duration-300 hover:scale-105 hover:shadow-neon-lg hover:from-cyan-400 hover:to-purple-400 focus:ring-2 focus:ring-cyan-400"
              >
                {example.name}
              </button>
            ))}
          </div>
        </div>
      );
    }

    const selectedExample = examples.find(ex => ex.id === currentExample);
    if (selectedExample) {
      return (
        <div className="p-8">
          <div className="flex items-center mb-8 gap-5">
            <button 
              onClick={() => setCurrentExample('menu')}
              className="bg-gradient-to-r from-gray-700 via-gray-900 to-black text-cyan-300 border-none py-2 px-5 rounded-lg cursor-pointer text-base font-semibold shadow-md hover:from-cyan-700 hover:to-purple-700 hover:text-white transition-all duration-300"
            >
              ← 返回菜单
            </button>
            <h2 className="text-2xl font-bold text-cyan-300 m-0 drop-shadow-glow">{selectedExample.name}</h2>
          </div>
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 min-h-96 shadow-2xl border border-cyan-400/20 animate-fade-in">
            {selectedExample.component}
          </div>
        </div>
      );
    }

    return <div className="text-red-500">例子未找到</div>;
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-black via-gray-900 to-blue-950 flex items-center justify-center relative overflow-hidden">
      {/* 背景发光粒子/装饰，可选 */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-cyan-500 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-purple-600 opacity-20 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      <div className="relative z-10 w-full">
        {renderContent()}
      </div>
    </div>
  );
}

export default App;

// tailwind.config.js 里可加自定义动画和阴影:
// drop-shadow-glow: '0 0 8px #38bdf8, 0 0 16px #6366f1',
// shadow-neon: '0 0 8px #38bdf8',
// shadow-neon-lg: '0 0 24px #6366f1',
// animate-glow, animate-fade-in, animate-pulse-slow 可自定义 