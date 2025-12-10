import AnalysisChart from '@/components/content/AnalysisChart';
import Books from '@/components/content/Books';
import TopExpenses from '@/components/content/TopExpenses';
import { useExpenseSummaryOfBooks } from '@/services/bookServices';
import { useAuthStore } from '@/store/authStore';

const Dashboard = () => {
  const userId = useAuthStore((state: any) => {
    return state.userId;
  });
  const { data: expenseSummaryOfBooks, isLoading } =
    useExpenseSummaryOfBooks(userId);

  return (
    <div>
      <div className='header-margin mb-5'>
        <div className='container mx-auto mt-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-4'>
            <Books />
            <TopExpenses />
          </div>
          <div className='mt-4 px-4'>
            <AnalysisChart
              data={expenseSummaryOfBooks}
              isLoading={isLoading}
              dataKey='book_name'
              chartTitle='Monthly Expenses By Books'
              chartDescription='Monthly expenses by books in last 12 months'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
