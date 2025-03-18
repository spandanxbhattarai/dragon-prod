'use client';

import React, { useState } from 'react';

// Types
type ExamType = 'math' | 'science' | 'english' | 'history' | 'computer';

interface Performer {
  id: string;
  name: string;
  score: number;
}

// Mock Data
const mockResults = {
  math: [
    { id: "MATH1001", name: "Alice Johnson", score: 98 },
    { id: "MATH1002", name: "Bob Smith", score: 96 },
    { id: "MATH1003", name: "Charlie Brown", score: 95 },
    { id: "MATH1004", name: "Diana Prince", score: 94 },
    { id: "MATH1005", name: "Edward Lewis", score: 93 },
    { id: "MATH1006", name: "Fiona Apple", score: 92 },
    { id: "MATH1007", name: "George Miller", score: 91 },
    { id: "MATH1008", name: "Hannah Montana", score: 90 },
    { id: "MATH1009", name: "Ian McKellen", score: 89 },
    { id: "MATH1010", name: "Julia Roberts", score: 88 }
  ],
  science: [
    { id: "SCI1001", name: "Marie Curie", score: 99 },
    { id: "SCI1002", name: "Albert Einstein", score: 98 },
    { id: "SCI1003", name: "Neil deGrasse Tyson", score: 97 },
    { id: "SCI1004", name: "Stephen Hawking", score: 96 },
    { id: "SCI1005", name: "Jane Goodall", score: 95 },
    { id: "SCI1006", name: "Carl Sagan", score: 94 },
    { id: "SCI1007", name: "Ada Lovelace", score: 93 },
    { id: "SCI1008", name: "Isaac Newton", score: 92 },
    { id: "SCI1009", name: "Rosalind Franklin", score: 91 },
    { id: "SCI1010", name: "Nikola Tesla", score: 90 }
  ],
  english: [
    { id: "ENG1001", name: "William Shakespeare", score: 100 },
    { id: "ENG1002", name: "Jane Austen", score: 98 },
    { id: "ENG1003", name: "Ernest Hemingway", score: 96 },
    { id: "ENG1004", name: "Virginia Woolf", score: 95 },
    { id: "ENG1005", name: "Charles Dickens", score: 94 },
    { id: "ENG1006", name: "Maya Angelou", score: 93 },
    { id: "ENG1007", name: "George Orwell", score: 92 },
    { id: "ENG1008", name: "Emily Dickinson", score: 91 },
    { id: "ENG1009", name: "J.K. Rowling", score: 90 },
    { id: "ENG1010", name: "Mark Twain", score: 89 }
  ],
  history: [
    { id: "HIST1001", name: "Howard Zinn", score: 97 },
    { id: "HIST1002", name: "Doris Kearns Goodwin", score: 96 },
    { id: "HIST1003", name: "David McCullough", score: 95 },
    { id: "HIST1004", name: "Herodotus", score: 94 },
    { id: "HIST1005", name: "Mary Beard", score: 93 },
    { id: "HIST1006", name: "Ron Chernow", score: 92 },
    { id: "HIST1007", name: "Barbara Tuchman", score: 91 },
    { id: "HIST1008", name: "Eric Foner", score: 90 },
    { id: "HIST1009", name: "Thucydides", score: 89 },
    { id: "HIST1010", name: "Jared Diamond", score: 88 }
  ],
  computer: [
    { id: "CS1001", name: "Grace Hopper", score: 100 },
    { id: "CS1002", name: "Alan Turing", score: 99 },
    { id: "CS1003", name: "Tim Berners-Lee", score: 98 },
    { id: "CS1004", name: "Linus Torvalds", score: 97 },
    { id: "CS1005", name: "Margaret Hamilton", score: 96 },
    { id: "CS1006", name: "Guido van Rossum", score: 95 },
    { id: "CS1007", name: "Donald Knuth", score: 94 },
    { id: "CS1008", name: "Barbara Liskov", score: 93 },
    { id: "CS1009", name: "John McCarthy", score: 92 },
    { id: "CS1010", name: "Brendan Eich", score: 91 }
  ]
};

const examNames = {
  math: 'Mathematics',
  science: 'Science',
  english: 'English',
  history: 'History',
  computer: 'Computer Science'
};

// Helper functions
function getExamName(examCode: string): string {
  return examNames[examCode as keyof typeof examNames] || examCode;
}

async function searchCandidate(examType: ExamType, candidateId: string): Promise<Performer | null> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  const candidates = mockResults[examType];
  return candidates.find(c => c.id === candidateId) || null;
}

async function fetchTopPerformers(examType: ExamType): Promise<Performer[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return mockResults[examType] || [];
}

// Main component
export default function Home() {
  const [topPerformers, setTopPerformers] = useState<Performer[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingPerformers, setIsLoadingPerformers] = useState(false);
  const [resultMessage, setResultMessage] = useState<string | null>(null);
  const [examType, setExamType] = useState<ExamType | ''>('');
  const [candidateId, setCandidateId] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    // Form validation
    if (!examType) {
      setError('Please select an exam');
      return;
    }

    if (!candidateId) {
      setError('Please enter your Candidate ID');
      return;
    }

    setError(null);
    setIsSearching(true);
    setResultMessage(null);

    try {
      const result = await searchCandidate(examType, candidateId.trim().toUpperCase());

      if (result) {
        setResultMessage(
          `Your score for ${getExamName(examType)} is: ${result.score}%`
        );
      } else {
        setResultMessage(`No results found for Candidate ID: ${candidateId}`);
      }
    } catch (error) {
      setResultMessage('An error occurred while searching. Please try again.');
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleExamChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as ExamType | '';
    setExamType(value);

    if (!value) {
      setTopPerformers([]);
      return;
    }

    setIsLoadingPerformers(true);

    try {
      const performers = await fetchTopPerformers(value);
      setTopPerformers(performers);
    } catch (error) {
      console.error('Error fetching top performers:', error);
    } finally {
      setIsLoadingPerformers(false);
    }
  };

  return (
    <div className="relative w-full bg-gray-50 px-4 sm:px-6 md:px-8 lg:px-8 xl:px-8 2xl:px-16 py-6 sm:py-8">
      <div className="max-w-full xl:max-w-[100rem] 2xl:max-w-[120rem] mx-auto">
        <div className="flex justify-center mb-6">
          <div className="px-4 py-2 rounded-full bg-gray-900 text-white font-Urbanist font-medium">
            Results
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl font-CanelaDeck font-bold text-center text-gray-800 mb-2">
          Exam Results
        </h1>

        <p className="text-sm sm:text-base md:text-base lg:text-lg xl:text-lg text-center text-gray-600 mb-8 font-Urbanist">
          Select an exam and enter your Candidate ID to view your results
        </p>

        {resultMessage && (
          <div className={`mb-6 p-4 rounded-lg text-center ${resultMessage.includes('No results') || resultMessage.includes('error')
            ? 'bg-red-50 text-red-700'
            : 'bg-green-50 text-green-700'
            }`}>
            {resultMessage}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 xl:gap-8">
          {/* Exam Search Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-semibold font-Urbanist text-gray-800 mb-5 font-CanelaDeck">
              Search Your Results
            </h2>

            {error && (
              <div className="mb-4 p-3 bg-blue-50 text-blue-600 rounded-md text-sm">
                {error}
              </div>
            )}

            <form onSubmit={handleSearch}>
              <div className="mb-5">
                <label htmlFor="exam-select" className="block mb-1.5 font-medium font-GTAmerican text-gray-700">
                  Select Exam
                </label>
                <select
                  id="exam-select"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md font-GTAmerican text-base outline-none transition-colors focus:border-gray-500 appearance-none bg-white"
                  value={examType}
                  onChange={handleExamChange}
                  disabled={isSearching}
                  style={{
                    backgroundImage: "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23333%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E\")",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 15px center",
                    backgroundSize: "12px"
                  }}
                >
                  <option value="">Select an exam</option>
                  <option value="math">Mathematics</option>
                  <option value="science">Science</option>
                  <option value="english">English</option>
                  <option value="history">History</option>
                  <option value="computer">Computer Science</option>
                </select>
              </div>

              <div className="mb-5">
                <label htmlFor="candidate-id" className="block mb-1.5 font-medium text-gray-700 font-GTAmerican">
                  Candidate ID
                </label>
                <input
                  type="text"
                  id="candidate-id"
                  className="w-full px-4 py-3 border border-gray-300 rounded-md text-base outline-none transition-colors focus:border-gray-500"
                  placeholder="Enter your Candidate ID"
                  value={candidateId}
                  onChange={(e) => setCandidateId(e.target.value)}
                  disabled={isSearching}
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-md font-Urbanist text-base font-medium cursor-pointer transition-colors bg-blue-700 text-white hover:bg-rose-400 disabled:opacity-70"
                disabled={isSearching}
              >
                {isSearching ? 'Searching...' : 'Search Results'}
              </button>
            </form>
          </div>

          {/* Top Performers Card */}
          <div className="bg-white rounded-lg p-6 shadow-md">
            <div className="flex items-center mb-5">
              <span className="text-yellow-500 text-2xl mr-2">🏆</span>
              <h2 className="text-2xl font-semibold text-gray-800 mb-0 font-CanelaDeck">
                Top Performers
              </h2>
            </div>

            {isLoadingPerformers ? (
              <div className="flex justify-center items-center py-10">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-rose-300"></div>
              </div>
            ) : topPerformers.length > 0 ? (
              <div className="space-y-1 font-Urbanist font-bold">
                {topPerformers.map((performer, index) => (
                  <div
                    key={performer.id}
                    className="flex justify-between py-2.5 border-b border-gray-100 last:border-0"
                  >
                    <span className="font-bold font-Urbanist text-gray-800">
                      {index + 1}. {performer.name}
                    </span>
                    <span className="text-green-600 font-Urbanist font-bold">
                      {performer.score}%
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-10 font-GTAmerican">
                <div className="text-gray-300 text-5xl mb-3">🎖️</div>
                <p className="text-gray-800 mb-1">Select an exam to view top performers</p>
                <p className="text-gray-400 text-sm">
                  The top 10 candidates will be displayed here
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}