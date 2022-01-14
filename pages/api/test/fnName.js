const { useSession, signIn, signOut,getSession, SessionProvider} = require("next-auth/react");

var fnName = function() {
    // main code
signIn("google")
}

if (typeof require !== 'undefined' && require.main === module) {
    fnName();
}
