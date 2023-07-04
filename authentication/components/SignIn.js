import { useAuth } from "../../../shared/infra/contexts/AuthContext";

export default function SignIn() {
    const auth = useAuth();

    return (
        <div>
            <div
                className="h-100"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80)",
                }}
            >
                image
            </div>
            <div>form</div>
        </div>
    );
}
