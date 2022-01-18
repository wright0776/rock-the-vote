import React from 'react'

function SortedDataList(props) {
    const { data, className } = props;
    return (
        <div className={className}>
            {data.sort((a, b) => {
               return  b.votes - a.votes
            }).map((item, index) => props.render({ index, key: item._id, ...item }))}
        </div>
    )
}

export default SortedDataList
