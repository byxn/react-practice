import { useState } from 'react';
import Game from './Game.jsx';

function App() {
  const [currentExample, setCurrentExample] = useState('menu');

  const examples = [
    { id: 'game', name: '井字棋游戏', component: <Game /> },
  ];

  const renderContent = () => {
    if (currentExample === 'menu') {
      return (
        <div className="text-center p-8 bg-red-100">
          <h1 className="text-3xl font-bold text-blue-600 mb-8">React 练习例子</h1>
          <div className="space-y-4">
            {examples.map(example => (
              <button
                key={example.id}
                onClick={() => setCurrentExample(example.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
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
        <div className="p-5">
          <div className="flex items-center mb-8 gap-5">
            <button 
              onClick={() => setCurrentExample('menu')}
              className="bg-gray-500 hover:bg-gray-600 text-white border-none py-2 px-4 rounded cursor-pointer text-sm transition-colors duration-300"
            >
              ← 返回菜单
            </button>
            <h2 className="text-2xl font-bold text-gray-800 m-0">{selectedExample.name}</h2>
          </div>
          <div className="bg-gray-50 rounded-lg p-5 min-h-96">
            {selectedExample.component}
          </div>
        </div>
      );
    }

    return <div>例子未找到</div>;
  };

  return (
    <div className="max-w-6xl mx-auto p-5">
      {renderContent()}
    </div>
  );
}

export default App; 