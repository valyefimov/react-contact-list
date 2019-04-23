// @flow
import * as React from 'react';
import classNames from 'classnames';

import styles from './style.module.css';

type Props = {
  title: string,
  subTitle?: string | null,
  buttons: React.Element<any>,
  children: React.Element<any>,
};

function Layout({ title, buttons, subTitle, children }: Props) {
  return (
    <div className={classNames('shadow-sm bg-white rounded', styles.container)}>
      <div className={classNames('rounded-top px-4', styles.header)}>
        <div className="d-flex flex-row h-100 align-items-center justify-content-between">
          <div>
            <h1 className={classNames('mb-0', styles.title)}>{title}</h1>
            {subTitle && <div className={styles.subTitle}>{subTitle}</div>}
          </div>
          <div>{buttons}</div>
        </div>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

export default React.memo<Props>(Layout);
