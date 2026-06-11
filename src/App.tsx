import cn from 'clsx';
import React, { useState } from 'react';
import 'bulma/css/bulma.css';
import './App.scss';

enum SortParameter {
  Length = 'length',
  Alphabet = 'alphabet',
  None = '',
}

export const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

function prepareList(
  list: string[],
  sortParam: SortParameter,
  isReverse: boolean,
) {
  const preparedList = [...list];

  switch (sortParam) {
    case 'alphabet':
      preparedList.sort((a, b) => a.localeCompare(b));
      break;

    case 'length':
      preparedList.sort((a, b) => a.length - b.length);
      break;

    default:
      break;
  }

  if (isReverse) {
    preparedList.reverse();
  }

  return preparedList;
}

export const App: React.FC = () => {
  const [sortParam, setSortParam] = useState<SortParameter>(SortParameter.None);
  const [isReverse, setIsReverse] = useState(false);

  const visibleGoods = prepareList(goodsFromServer, sortParam, isReverse);

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortParam !== 'alphabet',
          })}
          onClick={() => setSortParam(SortParameter.Alphabet)}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortParam !== 'length',
          })}
          onClick={() => setSortParam(SortParameter.Length)}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', {
            'is-light': !isReverse,
          })}
          onClick={() => setIsReverse(!isReverse)}
        >
          Reverse
        </button>

        {(sortParam || isReverse) && (
          <button
            type="button"
            className="button is-danger is-light"
            onClick={() => {
              setSortParam(SortParameter.None);
              setIsReverse(false);
            }}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {visibleGoods.map(g => (
          <li data-cy="Good" key={g}>
            {g}
          </li>
        ))}
      </ul>
    </div>
  );
};
