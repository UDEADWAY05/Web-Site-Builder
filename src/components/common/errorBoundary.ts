import { Component, ReactNode, ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log('getError', error.message)
    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.log('componentDidCatch error', error.message)
    console.log('componentDidCatch errorInfo', errorInfo)
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return 'Sorry.. there was an error'
    }

    return this.props.children
  }
}

export default ErrorBoundary
