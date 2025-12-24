import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import {
  buildChartData,
  getAnalysisChartConfig,
  getYAxisRange,
} from '@/utils/commonUtils';
import Loader from './Loader';

type AnalysisChartProps = {
  dataKey: 'book_name' | 'category_name';
  data: any;
  chartTitle: string;
  chartDescription: string;
  isLoading?: boolean;
};

export default function AnalysisChart({
  dataKey,
  data,
  chartTitle,
  chartDescription,
  isLoading,
}: AnalysisChartProps) {
  const chartData = buildChartData(data, dataKey);
  const yAxisRange = getYAxisRange(chartData);
  const chartConfig = getAnalysisChartConfig(data, dataKey);
  return (
    <Card className='w-full'>
      <CardHeader>
        <CardTitle>{chartTitle}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent className='px-3 py-6 overflow-x-auto overflow-y-auto md:max-h-full max-h-[500px]'>
        {isLoading ? (
          <Loader show={isLoading} />
        ) : (
          <ChartContainer
            config={chartConfig}
            style={{ minWidth: '600px', maxWidth: '900px' }}
          >
            <BarChart
              accessibilityLayer
              data={chartData}
              style={{ minWidth: '500px', maxWidth: '900px' }}
            >
              <CartesianGrid vertical={false} />
              <YAxis type='number' domain={yAxisRange} />
              <XAxis
                dataKey='month'
                tickLine={false}
                tickMargin={5}
                fontSize={12}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              {Object.entries(chartConfig).map(([key, value], index) => {
                if (index === Object.keys(chartConfig).length - 1) {
                  return (
                    <Bar
                      key={key}
                      dataKey={key}
                      stackId='a'
                      fill={value.color}
                      barSize={30}
                    >
                      <LabelList
                        position='top'
                        offset={10}
                        orientation='horizontal'
                        className='fill-foreground font-medium'
                        fontSize={15}
                      />
                    </Bar>
                  );
                }
                return (
                  <Bar
                    key={key}
                    dataKey={key}
                    stackId='a'
                    fill={value.color}
                    barSize={30}
                  />
                );
              })}
            </BarChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
