import React from 'react';
import { ArrowRight, Stethoscope } from 'lucide-react';
import { commonHealthProblems } from '../../data/specialties';

interface HealthProblemsGridProps {
  onProblemClick: (problemId: string) => void;
}

export default function HealthProblemsGrid({ onProblemClick }: HealthProblemsGridProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-soft border border-gray-100 dark:border-gray-700">
      <div className="p-6 border-b border-gray-100 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Common Health Problems</h2>
        <p className="text-gray-600 dark:text-gray-300 mt-2">Find doctors for your specific health concerns</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {commonHealthProblems.map((problem) => (
            <button
              key={problem.id}
              onClick={() => onProblemClick(problem.id)}
              className="group p-4 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-secondary-50 dark:hover:bg-secondary-900/20 hover:shadow-medium transition-all duration-300 text-left"
            >
              <div className="flex items-start justify-between mb-3">
                <Stethoscope className="w-5 h-5 text-secondary-600 dark:text-secondary-400 group-hover:text-secondary-700 dark:group-hover:text-secondary-300" />
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-secondary-600 dark:group-hover:text-secondary-400 transition-colors" />
              </div>
              
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2 group-hover:text-secondary-600 dark:group-hover:text-secondary-400">
                {problem.name}
              </h3>
              
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                {problem.description}
              </p>
              
              <div className="text-xs text-secondary-600 dark:text-secondary-400">
                {problem.specialties.join(', ')}
              </div>
            </button>
          ))}
        </div>
        
        <div className="mt-6 text-center">
          <button className="inline-flex items-center px-6 py-3 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors">
            View All Health Problems
            <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>
      </div>
    </div>
  );
}