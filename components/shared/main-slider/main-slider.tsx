'use client'

import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useRef, useState } from 'react'
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Swiper as SwiperType } from 'swiper/types'

import { Button } from '@/components/ui/button'

import { SliderItem } from '../slider-item'

import { SliderLoader } from './slider-loader'
import { cn, getDays } from '@/lib/utils'
import { GETITEM } from '@/service/get-item'
import { ICarouselItem } from '@/types/carousel-item.types'

interface IMainSlider {
	className?: string
}

export const MainSlider = ({ className }: IMainSlider) => {
	const [isBeginning, setIsBeginning] = useState(true)
	const [isEnd, setIsEnd] = useState(false)
	const swiperRef = useRef<SwiperType | null>(null)

	const { data, isLoading } = useQuery({
		queryKey: ['mainSlider'],
		queryFn: () => GETITEM.SLIDER()
	})

	const handleSlideChange = (direction: 'prev' | 'next') => {
		if (swiperRef.current) {
			if (direction === 'prev') {
				swiperRef.current.slidePrev()
			} else {
				swiperRef.current.slideNext()
			}
		}
	}

	return (
		<div className={cn('pt-6 md:pt-12', className)}>
			<div className='flex flex-wrap gap-4 justify-between items-center mb-6 md:mb-12'>
				<h2 className='text-xl md:text-2xl lg:text-3xl font-semibold'>
					Ожидайте сегодня: {getDays()}
				</h2>
				<div className='hidden sm:flex gap-4 items-center'>
					<Button
						className='swiper-button-prev'
						onClick={() => handleSlideChange('prev')}
						title='Предыдущий слайд'
						disabled={isBeginning}
					>
						<ArrowLeft />
					</Button>
					<Button
						className='swiper-button-next'
						onClick={() => handleSlideChange('next')}
						title='Следующий слайд'
						disabled={isEnd}
					>
						<ArrowRight />
					</Button>
				</div>
			</div>

			<Swiper
				spaceBetween={15}
				slidesPerView={4}
				navigation={{
					prevEl: '.swiper-button-prev',
					nextEl: '.swiper-button-next'
				}}
				onSwiper={swiper => {
					swiperRef.current = swiper
					setIsBeginning(swiper.isBeginning)
					setIsEnd(swiper.isEnd)
				}}
				onSlideChange={swiper => {
					setIsBeginning(swiper.isBeginning)
					setIsEnd(swiper.isEnd)
				}}
				breakpoints={{
					0: {
						slidesPerView: 1.6,
						spaceBetween: 15
					},
					400: {
						slidesPerView: 2.6,
						spaceBetween: 15
					},
					479.98: {
						slidesPerView: 3,
						spaceBetween: 15
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 15
					}
				}}
			>
				{isLoading ? (
					<SliderLoader />
				) : (
					data[0].list.map((item: ICarouselItem) => (
						<SwiperSlide key={item.id}>
							<SliderItem {...item} />
						</SwiperSlide>
					))
				)}
			</Swiper>
		</div>
	)
}
