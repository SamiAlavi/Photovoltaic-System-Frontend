class AppSettings {
    static SESSION_KEY = "token";
    static MapboxAccessToken = "pk.eyJ1Ijoic2FtaWFsYXZpIiwiYSI6ImNsaWxuM3E0NTBiODIzZ212OGR1aTNmMnQifQ.f-oxF72sSsV2I7-wwlVN2g";

    private static BaseUrl = "http://localhost:3000/";
    private static ApiUrl = `${this.BaseUrl}api/`;

    private static AuthUrl = `${this.ApiUrl}`;
    static SignupUrl = `${this.AuthUrl}signup`;
    static SigninUrl = `${this.AuthUrl}signin`;
    static SignoutUrl = `${this.AuthUrl}signout`;
    static ProjectUrl = `${this.ApiUrl}project`;
    static ProductUrl = `${this.ApiUrl}product`;

    static RouteDefault = "";
    static RouteSignup = "signup";
    static RouteSignin = "signin";
    static RouteProject = "project";
    static RouteDashboard = "dashboard";
}

export default AppSettings;
