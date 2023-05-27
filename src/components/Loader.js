import React from 'react'
import { Triangle } from 'react-loader-spinner'

export default function Loader() {
    return (
        <div class="d-flex justify-content-center align-items-center position-absolute"
            style={{ width:"80%",marginTop: "8%" }}
        >
            <Triangle
                height="50%"
                width="70%"
                color="#4fa94d"
                ariaLabel="triangle-loading"
                wrapperStyle={{}}
                wrapperClassName=""
                visible={true}

            />
        </div>
    )
}
