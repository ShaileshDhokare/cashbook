import Books from '@/components/content/Books';
import TopExpenses from '@/components/content/TopExpenses';

const Dashboard = () => {
  return (
    <div>
      <div className='header-margin mb-5'>
        <div className='container mx-auto mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-4'>
            <Books />
            <TopExpenses />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
