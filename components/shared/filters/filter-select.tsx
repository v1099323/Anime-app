import Select, { ControlProps, SingleValueProps } from 'react-select'

import { IYear } from '@/types/years.type'

/* eslint-disable @typescript-eslint/no-explicit-any */

interface FilterSelect {
	periods: IYear[]
	handlePeriodChange: (selectedOptions: { value: string; label: string }[] | null) => void
	selectedPeriods: string[]
	isLoadingPeriods: boolean
}

export const FilterSelect = ({
	periods,
	handlePeriodChange,
	selectedPeriods,
	isLoadingPeriods
}: FilterSelect) => {
	const customStyles = {
		control: (provided: ControlProps) => ({
			...provided,
			backgroundColor: 'transparent',
			':hover': {
				backgroundColor: 'rgba(255, 255, 255, 0.1)'
			},
			boxShadow: 'none',
			minHeight: 'auto',
			cursor: 'pointer',
			minWidth: '40px'
		}),
		singleValue: (provided: SingleValueProps) => ({
			...provided,
			color: 'white',
			fontWeight: '600',
			fontSize: '0.875rem'
		}),
		menu: (provided: any) => ({
			...provided,
			backgroundColor: 'rgba(50, 50, 50,1)',
			marginBottom: '4px'
		}),
		option: (provided: any, state: any) => ({
			...provided,
			backgroundColor: state.isSelected ? 'hsl(271, 70%, 60%)' : 'transparent',

			color: 'white',
			fontSize: '0.875rem',
			':hover': state.isSelected
				? {}
				: {
						backgroundColor: 'rgba(255, 255, 255, 0.1)',
						cursor: 'pointer'
					},
			cursor: 'default'
		}),
		indicatorSeparator: () => ({
			display: 'none'
		})
	}
	return (
		<Select
			className='basic-multi-select'
			placeholder='Выберите период '
			isMulti
			name='periods'
			options={periods || []}
			value={periods ? periods.filter((year: IYear) => selectedPeriods.includes(year.value)) : []}
			onChange={handlePeriodChange as any}
			isDisabled={isLoadingPeriods}
			classNamePrefix='select'
			styles={customStyles as any}
		/>
	)
}
