
pipeline {
    agent any

    options {
        skipDefaultCheckout(true)
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Environment Check') {
            steps {
                sh 'node -v'
                sh 'npm -v'
            }
        }

        stage('Install Dependencies') {
            steps {
                dir('backend') {
                    sh 'npm install'
                }
            }
        }

        stage('Run Jest Tests') {
            steps {
                dir('backend') {
                    sh 'npm test'
                }
            }
        }
    }

    post {
        success {
            echo 'CI Pipeline Completed Successfully!'
        }

        failure {
            echo 'CI Pipeline Failed. Check the console output.'
        }
    }
}
