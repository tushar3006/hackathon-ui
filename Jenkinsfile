def testCommand = "cd /usr/src/app"
def slackUser = "@tushar.jagta"
def slackChannel = "#oo-manager-jenkins"
def jenkins
node {
   fileLoader.withGit('https://github.com/LimeTray/jenkins-pipeline-scripts.git', 'master', 'limetray-github', '') {
       jenkins = fileLoader.load('jenkins');
   }
}
jenkins.start(testCommand, slackUser, slackChannel)
