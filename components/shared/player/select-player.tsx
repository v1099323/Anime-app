'use client'

import { useEffect, useState } from 'react'
import Select, {
	type ControlProps,
	type DropdownIndicatorProps,
	type SingleValueProps
} from 'react-select'

/* eslint-disable @typescript-eslint/no-explicit-any */

type QualityType = 'fhd' | 'hd' | 'sd'

interface QualitySelectorProps {
	qualities: {
		fhd?: string
		hd?: string
		sd?: string
	}
	currentQuality: QualityType
	onChange: (quality: QualityType) => void
}

export const QualitySelector = ({ qualities, currentQuality, onChange }: QualitySelectorProps) => {
	const [availableQualities, setAvailableQualities] = useState<
		{ value: QualityType; label: string }[]
	>([])

	// Формируем список доступных качеств
	useEffect(() => {
		const options: { value: QualityType; label: string }[] = []
		if (qualities.fhd) options.push({ value: 'fhd', label: '1080p' })
		if (qualities.hd) options.push({ value: 'hd', label: '720p' })
		if (qualities.sd) options.push({ value: 'sd', label: '480p' })
		setAvailableQualities(options)
	}, [qualities])

	const customStyles = {
		control: (provided: ControlProps) => ({
			...provided,
			backgroundColor: 'transparent',
			':hover': {
				backgroundColor: 'rgba(255, 255, 255, 0.1)'
			},
			border: 'none',
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
		dropdownIndicator: (provided: DropdownIndicatorProps, state: any) => ({
			...provided,
			color: 'white',
			rotate: state.selectProps.menuIsOpen ? '180deg' : '0deg',
			padding: '4px',
			'&:hover': {
				color: '#fff'
			}
		}),
		indicatorSeparator: () => ({
			display: 'none'
		})
	}

	if (availableQualities.length <= 1) return null

	return (
		<>
			<Select
				className='react-select-container rounded-lg items-center justify-center transition-colors hover:bg-white/10 hover:text-[#ccc]'
				classNamePrefix='react-select'
				options={availableQualities}
				value={availableQualities.find(opt => opt.value === currentQuality)}
				onChange={selectedOption => selectedOption && onChange(selectedOption.value)}
				styles={customStyles as any}
				isSearchable={false}
				menuPlacement='top'
				components={{
					IndicatorSeparator: null
				}}
			/>
		</>
	)
}
