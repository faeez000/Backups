import React, { Fragment } from 'react'
import { CheckIcon } from '../../../shared/components/Icons'

export default function PricingCardInfo({content}) {
    return (
        <Fragment>
            <div className="flex  items-center pb-2">
                <CheckIcon />
                <p className=" pl-2 font-semibold text-lg"> {content}</p>
            </div>
        </Fragment>
    )
}
