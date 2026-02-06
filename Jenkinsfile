pipeline {
    agent none
        stages {
            stage('Build') {
                agent { docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-noble'
                    args '--network=host'
                }}
                environment {
                    NETLIFY_AUTH_TOKEN = credentials('NETLIFY_TOKEN')
                }
                when { branch 'master' }
                steps {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'npx netlify deploy --prod --site "tpdevopsfie4"'
                }
            post {
                always {
                    publishHTML([
                        allowMissing: true,
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
