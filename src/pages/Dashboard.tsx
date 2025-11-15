import { ResponsiveContainer, Pie, PieChart, Tooltip, Label } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { ChartConfig } from '@/components/ui/chart';
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import Books from '@/components/content/Books';
import TopExpenses from '@/components/content/TopExpenses';

export const description = 'A pie chart with a legend';
const chartData = [
  { browser: 'chrome', visitors: 275, fill: 'var(--color-chrome)' },
  { browser: 'safari', visitors: 200, fill: 'var(--color-safari)' },
  { browser: 'firefox', visitors: 187, fill: 'var(--color-firefox)' },
  { browser: 'edge', visitors: 173, fill: 'var(--color-edge)' },
  { browser: 'other', visitors: 90, fill: 'var(--color-other)' },
];
const chartConfig = {
  visitors: {
    label: 'Visitors',
  },
  chrome: {
    label: 'Chrome',
    color: 'var(--chart-1)',
  },
  safari: {
    label: 'Safari',
    color: 'var(--chart-2)',
  },
  firefox: {
    label: 'Firefox',
    color: 'var(--chart-3)',
  },
  edge: {
    label: 'Edge',
    color: 'var(--chart-4)',
  },
  other: {
    label: 'Other',
    color: 'var(--chart-5)',
  },
} satisfies ChartConfig;

const Dashboard = () => {
  return (
    <div>
      <div className='header-margin mb-5'>
        {/* Container + responsive 2-col layout (single col on mobile) */}
        <div className='container mx-auto mt-6'>
          {/* Analytics Charts */}
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6 m-4'>
            {/* Card / Column 1 */}
            <Card>
              <CardHeader className='items-center pb-0'>
                <CardTitle>Pie Chart - Legend</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
              </CardHeader>
              <CardContent className='flex-1 pb-0'>
                <ChartContainer
                  config={chartConfig}
                  className='mx-auto aspect-square max-h-[300px]'
                >
                  <PieChart>
                    <Pie
                      data={chartData}
                      nameKey='browser'
                      dataKey='visitors'
                      innerRadius={70}
                      outerRadius={120}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor='middle'
                                dominantBaseline='middle'
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className='fill-foreground text-3xl font-bold'
                                >
                                  {100000}
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 24}
                                  className='fill-muted-foreground'
                                >
                                  Visitors
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                    <Tooltip />
                    <ChartLegend
                      content={<ChartLegendContent nameKey='browser' />}
                      className='-translate-y-2 flex-wrap gap-2 *:basis-1/4 *:justify-center'
                    />
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Card / Column 2 */}
            <div className='rounded-lg border bg-card p-4'>
              <h2 className='text-lg font-semibold mb-2'>Expenses</h2>
              <div style={{ width: '100%', height: 350 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Rent', value: 500, fill: '#FB7185' },
                        { name: 'Marketing', value: 200, fill: '#FCA5A5' },
                        { name: 'R&D', value: 100, fill: '#FECACA' },
                      ]}
                      dataKey='value'
                      nameKey='name'
                      innerRadius={70}
                      outerRadius={120}
                    />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
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
