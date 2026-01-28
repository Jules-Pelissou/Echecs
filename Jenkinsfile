pipeline {
    agent none
        stages {
            stage('Build') {
                agent { docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    args '--network=host'
                }}
                steps {
                    sh 'npm install'
                    sh 'npm run build'
                }
            post {
                always {
                    publishHTLM([
                        allowmissing: true,
                        alwaysLinkToLastBuild: false,
                        icon: '', keepAll: true,
                        reportDir: 'html',
                        reportFiles: 'index.html',
                        reportName: 'VitestReport',
                        reportTitles: '',
                        useWrapperFileDirectly: true
                    ])
                }
            }
            }
        }
}
