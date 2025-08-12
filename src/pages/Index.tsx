import Sidebar from '@/components/Sidebar';
import MainContent from '@/components/MainContent';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar - 4 columns */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <Sidebar />
            </div>
          </div>
          
          {/* Main Content - 8 columns */}
          <div className="lg:col-span-8">
            <MainContent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
