import React, {useEffect, memo } from 'react'
import Animated, { Easing, useSharedValue, useAnimatedProps, withTiming, interpolateColor } from 'react-native-reanimated'
import Svg, { Path, Defs, ClipPath, G } from 'react-native-svg'
import AnimatedStroke from './animated-stroke'


const MARGIN = 10
const vWidth = 64 + MARGIN
const vHeight = 64 + MARGIN
const checkMarkPath = 'M6 27.5C11.5 30.3333 19.0821 37.2279 25.5 48.5C37.0829 68.844 35.5 17.5 63 3'
const outlineBoxPath = 'M19.0055 0.5H45.0055C51.584 0.5 56.1735 1.80465 59.1271 4.64013C62.0759 7.4711 63.5 11.931 63.5 18.5V45.5C63.5 52.069 62.0759 56.5289 59.1271 59.3599C56.1735 62.1954 51.584 63.5 45.0055 63.5H19.0055C12.4271 63.5 7.83471 62.1954 4.87832 59.3597C1.92672 56.5287 0.5 52.0688 0.5 45.5V18.5C0.5 11.9312 1.92672 7.47133 4.87832 4.64028C7.83471 1.80464 12.4271 0.5 19.0055 0.5Z'

const AnimatedPath = Animated.createAnimatedComponent(Path)

interface Props {
    checked?: boolean,
    highlightColor: string,
    checkmarkColor: string,
    boxOutlineColor: string
}

const AnimatedCheckbox = (props: Props) => {
    const { checked, checkmarkColor, highlightColor, boxOutlineColor } = props

    const progress = useSharedValue(0)

    useEffect(() => {
        progress.value = withTiming(checked ? 1 : 0, {
            duration: checked ? 300 : 100,
            easing: Easing.linear
        })
    }, [checked])

    const animatedBoxProps = useAnimatedProps(
        () => ({
            stroke: interpolateColor(
                Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
                [0,1],
                [boxOutlineColor, highlightColor],
                'RGB'
            ),
            fill: interpolateColor(
                Easing.bezier(0.16, 1, 0.3, 1)(progress.value),
                [0,1],
                ['#00000000', highlightColor],
                'RGB'
            ),
        })
    )

    return (
        <Svg viewBox={[-MARGIN, -MARGIN, vWidth + MARGIN, vHeight + MARGIN].join(' ')}>
            <Defs>
                <ClipPath id="clipPath">
                    <Path
                        fill="white"
                        stroke="gray"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        d={outlineBoxPath}
                    />
                </ClipPath>
            </Defs>
            <AnimatedStroke
                progress={progress}
                d={checkMarkPath}
                stroke={highlightColor}
                strokeWidth={10}
                strokeLinejoin="round"
                strokeLinecap="round"
                strokeOpacity={checked || false ? 1 : 0}
            />
            <AnimatedPath
                d={outlineBoxPath}
                strokeWidth={7}
                strokeLinejoin="round"
                strokeLinecap="round"
                animatedProps={animatedBoxProps}
            />
            <G clipPath="url(#clipPath)">
                <AnimatedStroke
                    progress={progress}
                    d={checkMarkPath}
                    stroke={checkmarkColor}
                    strokeWidth={10}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeOpacity={checked || false ? 1 : 0}
                />
            </G>
        </Svg>
    )
}

export default AnimatedCheckbox