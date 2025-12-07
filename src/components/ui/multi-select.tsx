import { Checkbox } from '@/components/ui/checkbox';
import { ChevronsUpDown, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Button } from './button';

interface Option {
  value: string;
  label: string;
}

interface MultiSelectProps {
  options?: Option[];
  selected?: string[];
  onChange: (selectedValues: string[]) => void;
  placeholder?: string;
  showSearch?: boolean;
  showActions?: boolean;
}

const MultiSelect = ({
  options = [],
  selected = [],
  onChange,
  placeholder = 'Select items...',
  showSearch = true,
  showActions = true,
}: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value];
    onChange(newSelected);
  };

  const filteredOptions = options
    .filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aIsSelected = selected.includes(a.value);
      const bIsSelected = selected.includes(b.value);

      if (aIsSelected && !bIsSelected) return -1;
      if (!aIsSelected && bIsSelected) return 1;
      return a.label.localeCompare(b.label);
    });

  return (
    <div
      className='relative min-w-[180px] max-w-[250px] text-zinc-900'
      ref={dropdownRef}
    >
      <div
        className={`flex min-h-9 w-full items-center justify-between rounded-md bg-transparent px-2 py-1 text-sm cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className='flex flex-wrap gap-1'>
          {selected.length === 0 && (
            <span className='text-muted-foreground'>{placeholder}</span>
          )}
          {selected.length > 0 && (
            <span className='flex items-center gap-2 text-secondary-foreground border rounded bg-secondary px-1.5 py-0.5 text-sm font-medium'>
              {selected.length} selected
              <div
                role='button'
                className='rounded-full p-0.5 hover:bg-secondary-foreground/20'
                onClick={() => onChange([])}
              >
                <X className='h-4 w-4 text-red-500' />
              </div>
            </span>
          )}
        </div>
        <ChevronsUpDown className='h-4 w-4 shrink-0 opacity-50' />
      </div>

      {isOpen && (
        <div className='absolute z-50 mt-1 max-h-60 w-full overflow-auto border bg-popover'>
          {showSearch && (
            <div className='sticky top-0 bg-popover p-2 z-10'>
              <input
                type='text'
                className='w-full border bg-transparent px-3 py-1 text-sm'
                placeholder='Search...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          )}

          <div className='p-1'>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className='relative flex gap-2 cursor-pointer select-none items-center px-2 py-1.5 text-sm hover:bg-accent'
                  onClick={() => toggleOption(option.value)}
                >
                  <Checkbox
                    checked={selected.includes(option.value)}
                    onCheckedChange={() => toggleOption(option.value)}
                  />
                  <span>{option.label}</span>
                </div>
              ))
            ) : (
              <div className='py-6 text-center text-sm text-muted-foreground'>
                No results found.
              </div>
            )}
            {showActions && (
              <div className='flex gap-3 justify-end my-2'>
                <Button
                  className='cursor-pointer'
                  variant='secondary'
                  size='sm'
                  onClick={() => onChange([])}
                >
                  Clear
                </Button>
                <Button
                  className='cursor-pointer'
                  onClick={() => setIsOpen(false)}
                  size='sm'
                >
                  Apply
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
