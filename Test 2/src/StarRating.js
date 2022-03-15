import React from 'react';
import { StarIcon } from '@heroicons/react/solid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default class StarRating extends React.Component {
  render() {
    const product = this.props.product;
    if (product == null)
      return null;
    return (
    <div className="mt-3 flex flex-col items-center">
        <p className="sr-only">{product.rating} out of 5 stars</p>
        <div className="flex items-center">
            {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                key={rating}
                className={classNames(
                    Math.floor(product.rating) > rating ? 'text-yellow-400' : 'text-gray-200',
                    'flex-shrink-0 h-5 w-5'
                )}
                aria-hidden="true"
                />
            ))}
        </div>
    </div>
    )
  }
}
