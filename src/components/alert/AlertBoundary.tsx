import React, { Component, ReactNode } from 'react';
import Header from '../header/Header';
import BaseUI from '../../layouts/container/BaseUI';
import { ErrorIcon } from '@/icons';
import { TypoNotoSans } from '@/layouts';
import type { Errors } from '@/interfaces';
import styles from '@/styles/ErrorBoundary.module.css';
import { Confirm } from '../alert';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Errors;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };
  reset = () => {
    this.setState({ hasError: false });
  };

  public static getDerivedStateFromError(error: Errors): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Errors, errorInfo: React.ErrorInfo) {
    console.error(error, errorInfo);
  }

  public render() {
    if (this.state.hasError && this.state.error) {
      if (this.state.error.isAlert) {
        return (
          <>
            {this.props.children}
            <Confirm isShow={true} message='hihi' handleClose={this.reset} handleConfirm={this.reset}></Confirm>
          </>
        );
      } else {
        const message = this.state.error.message ?? 'undefined error';
        const status = this.state.error.status ?? 'none';
        return (
          <BaseUI onClick={this.reset}>
            <Header />
            <div className={styles.container}>
              <ErrorIcon width='150px' fill='rgba(var(--primary-foreground-rgba))' />
              <TypoNotoSans variant='h6'>{message}</TypoNotoSans>
              <TypoNotoSans variant='caption'>{'Error Code : ' + status}</TypoNotoSans>
              <TypoNotoSans className={styles.caption} variant='caption' color='rgba(var(--highlight-foreground-rgba))'>
                아무 곳이나 눌러서 다시 시도하기
              </TypoNotoSans>
            </div>
          </BaseUI>
        );
      }
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
