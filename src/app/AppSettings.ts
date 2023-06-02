class AppSettings {
    private static serverUrl = "http://localhost:3000/";
    private static authUrl = `${this.serverUrl}auth/`;
    static signupUrl = `${this.authUrl}signup/`;
    static signinUrl = `${this.authUrl}signin/`;
}

export default AppSettings;
