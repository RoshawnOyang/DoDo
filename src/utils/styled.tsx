import React from 'react'
import { useStyledSystemPropsResolver } from 'native-base'

export const makeStyledComponent = (Comp: any ) => {
    return React.forwardRef(({ debug, ...props}: any, ref: any) => {
        const [ style, restProps ] = useStyledSystemPropsResolver(props)
        return (
            <Comp {...restProps} style={style} ref={ref}>
                {props.children}
            </Comp>
        )
    })
}