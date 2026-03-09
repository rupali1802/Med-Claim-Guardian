#!/usr/bin/env python3
"""
Example client for the Claim Denial Prediction API
This script demonstrates how to use the API to make predictions
"""

import requests
import json
from typing import Dict, Any

# API endpoint
API_URL = "http://localhost:8000"

class ClaimDenialAPIClient:
    """Client for interacting with the Claim Denial Prediction API"""
    
    def __init__(self, base_url: str = API_URL):
        self.base_url = base_url
    
    def predict_denial(
        self,
        patient_age: int,
        insurance_type: str,
        procedure_code: str,
        diagnosis_code: str,
        provider_type: str,
        claim_amount: float,
        prior_authorization: str,
        documentation_complete: str,
        coding_accuracy_score: float,
        claim_submission_delay_days: int,
        payer: str
    ) -> Dict[str, Any]:
        """
        Predict the probability of claim denial
        
        Args:
            All parameters correspond to the claim details
            
        Returns:
            Dictionary with denial_probability, risk_level, suggested_action, confidence_score
        """
        payload = {
            "patient_age": patient_age,
            "insurance_type": insurance_type,
            "procedure_code": procedure_code,
            "diagnosis_code": diagnosis_code,
            "provider_type": provider_type,
            "claim_amount": claim_amount,
            "prior_authorization": prior_authorization,
            "documentation_complete": documentation_complete,
            "coding_accuracy_score": coding_accuracy_score,
            "claim_submission_delay_days": claim_submission_delay_days,
            "payer": payer
        }
        
        try:
            response = requests.post(f"{self.base_url}/predict", json=payload)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error calling API: {e}")
            return None
    
    def get_model_info(self) -> Dict[str, Any]:
        """Get information about the trained model"""
        try:
            response = requests.get(f"{self.base_url}/model-info")
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            print(f"Error calling API: {e}")
            return None
    
    def health_check(self) -> bool:
        """Check if the API is running"""
        try:
            response = requests.get(f"{self.base_url}/")
            return response.status_code == 200
        except requests.exceptions.RequestException:
            return False


def print_prediction(claim_data: Dict, prediction: Dict) -> None:
    """Pretty print prediction results"""
    print("\n" + "="*60)
    print("CLAIM DENIAL PREDICTION REPORT")
    print("="*60)
    print("\nClaim Details:")
    print(f"  Patient Age: {claim_data['patient_age']}")
    print(f"  Insurance Type: {claim_data['insurance_type']}")
    print(f"  Provider: {claim_data['provider_type']}")
    print(f"  Claim Amount: \u20b9{claim_data['claim_amount']:.2f}")
    print(f"  Payer: {claim_data['payer']}")
    
    print("\nPrediction Results:")
    print(f"  Denial Probability: {prediction['denial_probability']*100:.1f}%")
    print(f"  Risk Level: {prediction['risk_level']}")
    print(f"  Confidence Score: {prediction['confidence_score']*100:.1f}%")
    
    print("\nRecommended Actions:")
    print(f"  {prediction['suggested_action']}")
    print("="*60 + "\n")


def main():
    """Example usage of the API client"""
    
    # Initialize client
    client = ClaimDenialAPIClient()
    
    # Check if API is running
    print("Checking API connection...")
    if not client.health_check():
        print("ERROR: API is not running!")
        print("Please start the API with: python claim_denial_api.py")
        return
    print("✓ API is running\n")
    
    # Get model information
    print("Fetching model information...")
    model_info = client.get_model_info()
    if model_info:
        print(f"  Model Type: {model_info['model_type']}")
        print(f"  Number of Estimators: {model_info['n_estimators']}\n")
    
    # Example claim 1: Low risk claim
    print("Example 1: Low Risk Claim")
    claim1 = {
        "patient_age": 45,
        "insurance_type": "Private",
        "procedure_code": "PROC_A",
        "diagnosis_code": "DX1",
        "provider_type": "Specialist",
        "claim_amount": 5000.00,
        "prior_authorization": "yes",
        "documentation_complete": "yes",
        "coding_accuracy_score": 0.95,
        "claim_submission_delay_days": 5,
        "payer": "Star Health"
    }
    
    prediction1 = client.predict_denial(**claim1)
    if prediction1:
        print_prediction(claim1, prediction1)
    
    # Example claim 2: High risk claim
    print("Example 2: High Risk Claim")
    claim2 = {
        "patient_age": 78,
        "insurance_type": "Government (PMJAY)",
        "procedure_code": "PROC_E",
        "diagnosis_code": "DX5",
        "provider_type": "Hospital",
        "claim_amount": 80000.00,
        "prior_authorization": "no",
        "documentation_complete": "no",
        "coding_accuracy_score": 0.55,
        "claim_submission_delay_days": 60,
        "payer": "ICICI Lombard"
    }
    
    prediction2 = client.predict_denial(**claim2)
    if prediction2:
        print_prediction(claim2, prediction2)
    
    # Example claim 3: Medium risk claim
    print("Example 3: Medium Risk Claim")
    claim3 = {
        "patient_age": 62,
        "insurance_type": "ESI",
        "procedure_code": "PROC_C",
        "diagnosis_code": "DX3",
        "provider_type": "Clinic",
        "claim_amount": 12000.00,
        "prior_authorization": "yes",
        "documentation_complete": "yes",
        "coding_accuracy_score": 0.78,
        "claim_submission_delay_days": 20,
        "payer": "HDFC ERGO"
    }
    
    prediction3 = client.predict_denial(**claim3)
    if prediction3:
        print_prediction(claim3, prediction3)


if __name__ == "__main__":
    main()
