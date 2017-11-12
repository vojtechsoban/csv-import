// https://issues.jenkins-ci.org/browse/JENKINS-28447, Jenkins file must be set to origin/master
node {
    stage('Checkout') {
        checkout([
                $class                           : 'GitSCM',
                branches                         : scm.branches,
                extensions                       : scm.extensions + [[$class: 'LocalBranch'], [$class: 'WipeWorkspace']],
                userRemoteConfigs                : [[credentialsId: 'sobik', url: 'git@github.com:vojtechsoban/csv-import.git']],
                doGenerateSubmoduleConfigurations: false
        ])
        sh "git checkout ${BRANCH_NAME}"
    }
    stage('Build info') {
        /*
        http://localhost:8081/scriptApproval/
        method hudson.model.Run getCause java.lang.Class
        method hudson.plugins.git.GitSCM getBranches
        method hudson.plugins.git.GitSCMBackwardCompatibility getExtensions
        method org.jenkinsci.plugins.workflow.support.steps.build.RunWrapper getRawBuild
        staticMethod org.codehaus.groovy.runtime.DefaultGroovyMethods getProperties java.lang.Object
        */
        def userCause = currentBuild.rawBuild.getCause(hudson.model.Cause$UserIdCause)
        if (userCause != null) {
            println "User cause ${userCause.properties}"
            userCause = null
        } else {
            echo "Other cause"
        }
        sh 'git branch'
        sh 'node --version'
        sh 'yarn --version'
    }
    stage('Finish') {
        echo "Done"
    }
}
