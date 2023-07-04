import React from "react";
import EmailConfigCard from "./EmailConfigCard";

export default function EmailConfigList({
    emailTemplates,
    deleteEmailTemplate,
    bodyTemplateList,
    getAndSetEmailTemplates,
}) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-y-6 justify-items-center xl:px-20">
            {emailTemplates.map((emailTemplate, index) => {
                return (
                    <EmailConfigCard
                        bodyTemplateList={bodyTemplateList}
                        deleteEmailTemplate={deleteEmailTemplate}
                        getAndSetEmailTemplates={getAndSetEmailTemplates}
                        emailTemplate={emailTemplate}
                        key={index}
                    />
                );
            })}
        </div>
    );
}
