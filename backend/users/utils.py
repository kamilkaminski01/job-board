from candidates.models import Candidate


def create_social_auth_candidate(backend, user, response, *args, **kwargs):
    if not kwargs.get("is_new"):
        return
    user_data = kwargs.get("details")
    email = user_data["email"]
    first_name = user_data["first_name"]
    last_name = user_data["last_name"]
    candidate = Candidate.objects.create(
        email=email,
        first_name=first_name,
        last_name=last_name,
    )
    return {"user": candidate}
