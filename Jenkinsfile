pipeline {
    agent { label 'base-agent' }
    environment {
        CREDENTIALS_ID = 'gitopia-jenops'
        BUCKET = 'gitopia-jenops-jenkins-artifacts'
        PATTERN = 'build/gitopiad'
    }
    stages {
        stage('Building gitopiad binary') {
            steps {
                sh '''
                export PATH=$PATH:/usr/local/go/bin
                make build
                '''
            }
        }
        stage('Store to GCS') {
            steps {
                step([$class: 'ClassicUploadStep', credentialsId: env
                        .CREDENTIALS_ID,  bucket: "gs://${env.BUCKET}",
                      pattern: env.PATTERN])
            }
        }

    }
}
