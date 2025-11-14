export function FeatureCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
}) {
  return (
    <div className='bg-white border rounded-xl shadow-sm p-6 hover:shadow-md transition'>
      <Icon className='w-10 h-10 text-green-600 mb-3' />
      <h3 className='text-xl font-semibold mb-1'>{title}</h3>
      <p className='text-gray-600 text-md'>{description}</p>
    </div>
  );
}
