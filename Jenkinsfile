def githubRepo = "icgc-argo/platform-ui"
def commit = "UNKNOWN"
def version = "UNKNOWN"
def uikitVersion = "UNKNOWN"

pipeline {
    agent {
        kubernetes {
            label 'argo-dictionary-executor'
            yaml """
apiVersion: v1
kind: Pod
spec:
  containers:
  - name: node
    image: node:12.6.0
    tty: true
"""
        }
    }
    stages {
        stage('Test') {
            steps {
                container('node') {
                    sh "npm ci"
                    sh "npm run test"
                    sh "DICTIONARY_NAME=test DICTIONARY_VERSION=0.0 npm run compile"
                }
            }
        }
    }
}
