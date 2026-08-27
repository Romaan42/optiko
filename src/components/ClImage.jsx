'use client'

import { CldImage } from "next-cloudinary"

export default function ClImage(props) {
    return (
        <CldImage {...props} />
    )
}
