---
title: "False Proofs: Limitations of the Random Oracle Model"
summary: >
    This blog post is based on my bachelor's thesis.
    It is written to give a brief introduction to the topic 
    for readers not familiar with the technical background.
    We explore the limitations of the random oracle model in cryptography
    and present a practical attack that exploits these limitations.
date: 2025-12-14
tags:
    - Computer Science
    - Cryptography
---

## Why should we care about cryptography?

The entire internet uses encryption to make sure that no unauthorized adversary can get access to your communications with your friends, your work and bank.
The reasons for encryption range from privacy to security.
To make sure everybody can trust such a cryptographic algorithm, intuition is not enough for us.
We want cryptographic proofs that guarantee that something is actually secure.
In practice, many of these proofs use some idealized model instead of reality.
This is because the complexity of reality would lead to complex proofs.
Instead, certain assumptions are made to significantly reduce this complexity.

From this, the question arises: Are these idealized models actually good representations of reality?
In my bachelor's thesis, I analyzed one of the most popular idealized models in cryptography: the random oracle model.

## What is the random oracle model?

The [random oracle model](https://en.wikipedia.org/wiki/Random_oracle) is such an idealized model that abstracts reality.
In it, there are so-called random oracles that behave like perfectly random functions and all parties have access to.
Same queries to the random oracle always return the same output, but new queries return completely random outputs.
Because of this idealized behavior, random oracles are not realizable in practice.
Therefore, we _instantiate_ them with real-world functions that behave sort of randomly.

Often, [hash functions](https://en.wikipedia.org/wiki/Hash_function) are modeled as random oracles in cryptographic proofs.
This significantly simplifies the proofs as they do not have to consider the actual structure of hash functions.
When the proof is finished, the random oracle is instantiated with the original hash function and we assume that the security from the proof carries over.

This leads to one observation: All parties in the proof have access to the random oracle, therefore all parameters of the function are known to them.
This means that an adversary can analyze the structure of these deterministic functions to find weaknesses.

## Popular use: The Fiat-Shamir transformation

One of the most popular applications of the random oracle model is the [Fiat-Shamir transformation](https://en.wikipedia.org/wiki/Fiat%E2%80%93Shamir_heuristic).
It is a method to convert [interactive proof systems](https://en.wikipedia.org/wiki/Interactive_proof_system) into non-interactive ones.
This means that the prover and verifier do not have to communicate back and forth anymore.
Instead, the prover can just send a single message to the verifier.
This is done by replacing the verifier's random challenges with outputs from a random oracle.

## A practical attack

The attack analyzed in the main part of my thesis targets a specific proof system called [GKR protocol](https://www.microsoft.com/en-us/research/wp-content/uploads/2016/12/2008-DelegatingComputation.pdf).
It is a proof system that allows a prover to convince a verifier that it correctly executed a computation without having to do the entire computation themselves.
The protocol works by encoding the output of the computation in a multilinear function $\hat{y}$ and comparing it at some random point with the result of that operation on its inputs.
This is done until the inputs of the computation are reached and we can directly check them.
The version used for the attack splits the input of the computation into two parts, one public and one private only to the prover.
The verifier only knows the public part and gets a commitment to the private part from the prover.
This commitment can be seen as a "locked box" containing the private input for which the verifier can later check that the prover did not lie about it.

To make sure that the prover cannot cheat by just guessing the value at the random point, the verifier has to choose this point randomly.
In the non-interactive version of the protocol, this is done by querying a random oracle with the description of the computation and some additional parameters.
However, since the random oracle is instantiated with a real hash function, the prover can compute the hash within the computation itself.

The simplest way to prove a false statement about a computation is to use the following computation $C$ that takes only some private input $w$:

- compute the commitment $\alpha$ to the private input $w$.
- view the private input $w$ as a description of some computation $\psi$.
- compute $\gamma=h(\psi,(0,0),\alpha)$ using the hash function $h$ instantiating the random oracle.
- output $(\gamma, \gamma-1)$ as the result of the computation.

A cheating prover can now use $\langle C\rangle$ for the private input $w$ and convince the verifier to accept the false statement that the output is $y^*=(0,0)$ even though that is clearly impossible by definition.

For understanding why this works, we look at how the random point for verification is computed using Fiat-Shamir.
At the start, the verifier has access to the description of the computation $\langle C \rangle$, the commitment $\alpha$ to the private input, and the claimed output of the computation $(0,0)$.
It queries the random oracle with these values to get the random point $\gamma$, i.e. computing the hash function $r=h(\langle C \rangle, (0,0), \alpha)$.

Checking the unique multilinear encodings of the values $(0,0)$ and $(\gamma, \gamma-1)$, we can quickly see that

$$
\begin{align*}
    \widehat{y^*}(X) &= 0 \\
    \hat{y}(X) &= \gamma - X.
\end{align*}
$$

These definitions fullfill that $\hat{y}(0)=\gamma$ and $\hat{y}(1)=\gamma-1$, and that $\widehat{y^*}(0) = 0 = \widehat{y^*}(1)$.
We have seen that the computation of $\gamma$ is exactly the same as the random point $r$ computed by the verifier.
Therefore, we have that $\hat{y}(r) = \gamma-r = \gamma-\gamma = 0 = \widehat{y^*}(r)$.
This fact allows us to claim that the output of the computation is indeed $(0,0)$ while doing an honest proof with the actual inputs and outputs without the modifier noticing this swap of claimed outputs.

This attack shows that there are aspects of the random oracle model that do not translate into reality and lead to incorrect security guarantees.

## Possible solutions

This attack could be prevented by using the [XFS transformation](https://eprint.iacr.org/2025/329.pdf) instead of the Fiat-Shamir transformation.
It adds an additional layer of indirection by requiring a [proof-of-work](https://en.wikipedia.org/wiki/Proof_of_work) solution to be included in the hash function computation.
By setting the difficulty of the proof-of-work high enough and generating the puzzle based on all previous parameters, the circuit can neither compute the puzzle solution nor have it precomputed.
This prevents the prover from being able to compute the random point within the computation itself and thus prevents the attack.

## Takeaways

If you take one thing away from this blog post, let it be the following:

- Idealized models are useful tools to simplify complex problems, but they come with limitations.
- The random oracle model should only be used as a sanity check for filtering out obviously insecure schemes.
- This field is an active area of research, and new techniques are being developed to address these limitations such as the XFS transformation.

## Full details

If you are interested in the full details of the attack and the underlying concepts, feel free to check out my bachelor's thesis.
It can be found on my GitHub repository under [Releases](https://github.com/moritz-hoelting/bachelor-thesis/releases).
