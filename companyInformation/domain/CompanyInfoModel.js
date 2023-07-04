export default class CompanyInfoModel {
    constructor(
        companyName = null,
        companyAddress = null,
        contactNo = null,
        logo = null,
        email = null,
        country = null,
        state = null,
        city = null,
        bankName = null,
        bankAccNo = null,
        bankIFSC = null,
        termsAndCondition = null,
        gstin = null,
        countryCode = null,
        stateCode = null
    ) {
        // @ts-ignore
        this.CompanyName = companyName;
        this.CompanyAddress = companyAddress;
        this.ContactNo = contactNo;
        this.Logo = logo;
        this.Email = email;
        this.Country = country;
        this.State = state;
        this.City = city;
        this.BankName = bankName;
        this.BankAccNo = bankAccNo;
        this.BankIFSC = bankIFSC;
        this.TermsAndCondition = termsAndCondition;
        this.GSTIN = gstin;
        this.CountryCode = countryCode;
        this.StateCode = stateCode;
    }
}
